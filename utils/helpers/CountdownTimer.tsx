export default function CountdownTimer(props: {time: number}) {
    const { time } = props;
    return <div className="dark:text-sky-100">
        {`${Math.floor(time / 60)}`.padStart(2, "0")}:
        {`${time % 60}`.padStart(2, "0")}
    </div>
}