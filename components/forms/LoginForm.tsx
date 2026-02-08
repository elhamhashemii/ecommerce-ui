"use client"

import { siteConfig } from "@/config/site";
import { routes } from "@/lib/routeNames";
import { ChangeEvent, useState } from "react"
import { FcGoogle } from "react-icons/fc";
import { env } from "@/config/env";
import { Input } from "@heroui/input";
import { toast } from "react-toastify";
import { AUTH_ENDPOINTS } from "@/lib/endpoints";
import { phoneRegex } from "@/utils/helpers/regex";
import Link from "next/link";
import { content } from "@/config/content";
import { Button } from "@heroui/button";
import PhoneInput from "./inputs/PhoneInput";
import CountdownTimer from "@/utils/helpers/CountdownTimer";
import { Card } from "@heroui/card";
import { useUser } from "@/context/user";
import { normalizePersianNumbers } from "@/utils/formatter/main";
import { checkPhone, requestOtp } from "@/actions/server/serverActions";
import { verifyOTP } from "@/actions/client/clientActions";
import { useSearchParams, useRouter } from "next/navigation";
import { syncCartAfterLogin } from "@/utils/helpers/main";

interface IProps {
    noHead?: boolean;
    onSignup?: () => void;
    className?: string;
    isModal?: boolean;
    onFinish?: () => void;
}

export function handleGoogleAuth() {
    window.location.href = env.apiUrl + AUTH_ENDPOINTS.GOOGLE
}

export const LoginForm = (props: IProps) => {
    const { className, isModal = false, onFinish = () => { } } = props;
    const router = useRouter()
    const twoMinutes = 120;
    const { setUser } = useUser();
    const { noHead = false, onSignup } = props;
    const [phoneNumber, setPhoneNumber] = useState("")
    const [otp, setOTP] = useState("")
    const [isOnOTPStep, setIsOnOTPStep] = useState(phoneNumber ? true : false)
    const [time, setTime] = useState(twoMinutes);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinalLoading, setIsFinalLoading] = useState(false);

    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect");

    function onChangePhoneNumber(e: ChangeEvent<HTMLInputElement>) {
        const value = normalizePersianNumbers(e.target.value);
        setPhoneNumber(value)
    }

    function onChangeOTP(e: ChangeEvent<HTMLInputElement>) {
        setOTP(normalizePersianNumbers(e.target.value))
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
        if (!phoneRegex.test(phoneNumber)) return;
        try {
            setIsLoading(true);
            const response = await checkPhone(phoneNumber)
            console.log({ response })
            if (response.exists) {
                console.log("YES")
                setTime(twoMinutes);
                startTimer();
                const otpRes = await requestOtp(phoneNumber)
                otpRes && (otpRes.status === 200) && setIsOnOTPStep(true);
                return;
            }
            console.log("NOPE")
            toast.info(<div>
                <div className="text-sm">حساب کاربری با این مشخصات یافت نشد.</div>
                <div className="text-xs mt-2">می توانید حساب کاربری جدید بسازید.</div>
            </div>)
            router.push(`${routes.SIGNUP}?phoneNumber=${phoneNumber}`);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || "Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }


    async function handleLogin() {
        try {
            setIsFinalLoading(true);

            const response: any = await verifyOTP({ phoneNumber, code: otp });

            if (response.token) {
                setUser(response.user);
                syncCartAfterLogin()

                // modal login (no redirect)
                if (isModal) {
                    onFinish();
                    return;
                }
                const safeRedirect =
                    redirect?.startsWith("/") ? redirect : routes.PROFILE;

                router.replace(safeRedirect);
            }
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong!"
            );
        } finally {
            setIsFinalLoading(false);
        }
    }


    function handleBack() {
        setIsOnOTPStep(false)
        setTime(0)
    }

    function handleResendOtp() {
        toast.info(<div className="text-sm">کد امنیتی مجدد برای شماره {phoneNumber} ارسال شد.</div>)
        handleGetOtp()
    }

    // function handleSignUp() {
    //     if (onSignup) {
    //         onSignup()
    //     } else router.push(routes.SIGNUP)
    // }

    function handleSignUp() {
        const query = redirect ? `?redirect=${encodeURIComponent(redirect)}` : "";
        router.push(`${routes.SIGNUP}${query}`);
    }


    return <Card className={`${className} flex flex-col items-center justify-center p-8`}>
        {!isOnOTPStep ?
            !noHead && <>
                <Link href={routes.HOME}>
                    {/* <MyImage alt="login-to-salsal" src={siteConfig.images.logo} width={100} height={200} /> */}
                </Link>
                <h1 className="text-lg mb-8 -mt-3">{content.login}</h1>
            </> :
            <div className="mt-8 flex flex-col items-center justify-center">
                {/* <MyImage alt="salsal-otp" src={siteConfig.images.otp.src} width={200} height={200} /> */}
                <div className="text-lg mt-8 mb-2">{content.pleaseEnterOTPSentTo}</div>
                <div className="font-bold">{phoneNumber}</div>
            </div>
        }
        <form onSubmit={(e) => e?.preventDefault()} className="w-full flex flex-col gap-4">
            {!isOnOTPStep ?
                <>
                    <PhoneInput name="phoneNumber" value={phoneNumber} onChange={onChangePhoneNumber} isRequired />

                    <div className="text-sm">{content.dontHaveAnAccount} <span className="font-semibold text-sm px-1 underline text-primary cursor-pointer" onClick={handleSignUp}>{content.createAccount}</span></div>
                    <Button color="primary" className="mt-0" onPress={handleGetOtp} isLoading={isLoading}>{content.submit}</Button>
                    <Button startContent={<FcGoogle size={25} />} variant="bordered" onPress={handleGoogleAuth}>{content.signInWithGoogle}</Button>
                    <div className="text-xs w-full text-center">ورود شما به معنای پذیرش
                        <a href={routes.TERMS} target="_href" className="font-semibold text-xs underline text-primary cursor-pointer"> شرایط و قوانین پلتفرم </a>
                        است.
                    </div>
                </> :
                <>
                    <Input value={otp} style={{ direction: "ltr" }} onChange={onChangeOTP}
                        dir="ltr"
                        // allowedKeys={"^[0-9]*$"}
                        // allowedKeys="^[0-9\u06F0-\u06F9\u0660-\u0669]*$"
                        className="w-full flex items-center justify-center mt-4 !ltr"
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
                    <Button color="primary" className="mt-1" onPress={handleLogin} isLoading={isFinalLoading}>{content.login}</Button>
                    <Button onPress={handleBack} variant="faded" color="primary">{content.back}</Button>
                </>
            }
        </form>
    </Card>
}