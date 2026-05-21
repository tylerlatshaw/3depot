import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export function getRelativeTime(dateString: string) {
    const now = dayjs();
    const date = dayjs(dateString);

    const minutes = now.diff(date, "minute");
    const hours = now.diff(date, "hour");
    const days = now.diff(date, "day");

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes} min ago`;
    }

    if (hours < 24) {
        return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
    }

    return `${days} day${days !== 1 ? "s" : ""} ago`;
}