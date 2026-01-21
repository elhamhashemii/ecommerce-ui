"use client"

import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routeNames";
import { ChangeEvent, useEffect, useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { handleGoogleAuth } from "./LoginForm";
import { toast } from "react-toastify";
import { phoneRegex } from "@/utils/helpers/regex";
import Link from "next/link";
import { content } from "@/config/content";
import { Input } from "@heroui/input";
import PhoneInput from "./inputs/PhoneInput";
import { Button } from "@heroui/button";
import CountdownTimer from "@/utils/helpers/CountdownTimer";
import { Card } from "@heroui/card";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/user";
import { convertPersianToEnglishDigits, normalizePersianNumbers } from "@/utils/formatter/main";
import { checkPhone, requestOtp } from "@/actions/server/serverActions";
import { verifyOTP } from "@/actions/client/clientActions";
import { useSearchParams } from "next/navigation";

interface IProps {
    onLogin?: () => void;
    className?: string;
    isModal?: boolean;
    onFinish?: () => void;
}

export const SignUpForm = (props: IProps) => {
    const { onLogin = undefined, className = undefined, isModal = false, onFinish = () => { } } = props;
    const router = useRouter()
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    const twoMinutes = 120;
    const { setUser } = useUser()
    const [otp, setOTP] = useState("")
    const [fullName, setFullName] = useState("")
    const [userCredential, setUserCredential] = useState("") // email or phone number
    const [isOnOTPStep, setIsOnOTPStep] = useState(userCredential ? true : false)
    const [time, setTime] = useState(twoMinutes);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinalLoading, setIsFinalLoading] = useState(false);

    function onChangeFullName(e: ChangeEvent<HTMLInputElement>) {
        setFullName(e.target.value)
    }

    function onChangeUserCredential(e: ChangeEvent<HTMLInputElement>) {
        setUserCredential(normalizePersianNumbers(e.target.value))
    }

    function onChangeOTP(val: string) {
        setOTP(normalizePersianNumbers(val))
    }

    function startTimer() {
        let timer = setInterval(() => {
            setTime((time) => {
                if (time === 0) {
                    clearInterval(timer);
                    return 0;
                } else return time - 1;
            });
        }, 1000);
    }

    async function handleGetOtp() {
        if (!phoneRegex.test(userCredential)) return;
        try {
            setIsLoading(true);
            const response = await checkPhone(userCredential)
            if (response.exists === false) {
                setTime(twoMinutes);
                startTimer();
                const otpRes = await requestOtp(userCredential)
                otpRes && (otpRes.status === 200) && setIsOnOTPStep(true);
                return;
            }
            router.push(`${routes.LOGIN}?phoneNumber=${userCredential}`);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    async function handleSignUp() {
        try {
            setIsFinalLoading(true)
            const response: any = await verifyOTP({ phoneNumber: userCredential, code: otp, fullName: fullName })
            if (response.token) {
                setUser(response.user);

                if (isModal) {
                    onFinish();
                    return;
                }

                // router.replace(redirect || routes.PROFILE);
                const safeRedirect =
                    redirect?.startsWith("/") ? redirect : routes.PROFILE;

                router.replace(safeRedirect);
                setUser(response.user)

            }

        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || "Something went wrong!")
        } finally {
            setIsFinalLoading(false)
        }
    }

    function handleBack() {
        setIsOnOTPStep(false)
        setTime(0)
    }

    function handleResendOtp() {
        toast.info(<div className="text-sm">کد امنیتی مجدد برای شماره {userCredential} ارسال شد.</div>)
        handleGetOtp()
    }

    // useEffect(() => {
    //     userCredential && setUserCredential(String("kk"))
    // }, [])

    function handleLogin() {
        if (onLogin) {
            onLogin()
        } else router.push(routes.LOGIN)
    }

    return <Card className={`${className} flex flex-col items-center justify-center p-8`}>
        {!isOnOTPStep ? <>
            <Link href={routes.HOME}>
                {/* <MyImage alt="salsal-sign-up" height={200} src={siteConfig.images.logo} width={100} /> */}
            </Link>
            <h1 className="text-lg mb-8 -mt-3">{content.createAccount}</h1>
        </> :
            <div className="mt-8 flex flex-col items-center justify-center">
                {/* <MyImage alt="salsal-sign-up" src={siteConfig.images.otp.src} width={300} height={300} /> */}
                <div className="text-lg mt-8 mb-2">{content.pleaseEnterOTPSentTo}</div>
                <div className="font-bold">{userCredential}</div>
            </div>
        }
        <form onSubmit={(e) => e?.preventDefault()} className="w-full flex flex-col gap-4">
            {!isOnOTPStep ?
                <>
                    <Input value={fullName} isRequired label={content.fullName} onChange={onChangeFullName} />
                    <PhoneInput name="phoneNumber" value={userCredential} isRequired label={content.phoneNumber} onChange={onChangeUserCredential} />
                    <div className="text-sm">{content.alreadyHaveAnAccount} <span className="font-semibold text-sm px-1 underline text-primary cursor-pointer" onClick={handleLogin}>{content.signIn}.</span></div>
                    <Button isDisabled={userCredential === "" || fullName === ""} color="primary" onPress={handleGetOtp} isLoading={isLoading}>{content.createAccount}</Button>
                    <Button startContent={<FcGoogle size={25} />} variant="bordered" onPress={handleGoogleAuth}>{content.signUpWithGoogle}</Button>
                    <div className="text-xs w-full text-center">ورود شما به معنای پذیرش
                        <a href={routes.TERMS} target="_href" className="font-semibold text-xs underline text-primary cursor-pointer"> شرایط و قوانین پلتفرم </a>
                        است.
                    </div>
                </> :
                <>
                    <Input onChange={(e: any) => onChangeOTP(convertPersianToEnglishDigits(e?.target?.value || ""))}
                        style={{ direction: "ltr" }} dir="ltr"
                        // allowedKeys="^[0-9\u06F0-\u06F9\u0660-\u0669]*$"
                        className="w-full flex items-center justify-center mt-4"
                        size="lg"
                    // length={6}
                    />
                    {time > 0 ?
                        <CountdownTimer time={time} />
                        :
                        <div className="text-sm">
                            {content.didntGetTheCode}
                            <span className="cursor-pointer text-primary font-semibold text-sm px-1" onClick={handleResendOtp}>{content.resend}.</span>
                        </div>
                    }
                    <Button color="primary" className="mt-1" onPress={handleSignUp} isLoading={isFinalLoading}>{content.submit}</Button>
                    <Button onPress={handleBack} variant="faded" color="primary">{content.back}</Button>
                </>
            }
        </form>
    </Card>
}