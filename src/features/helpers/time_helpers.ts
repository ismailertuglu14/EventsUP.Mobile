export const howManyTimesAgo = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 0) {
        return `${days} days ago`;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    return `${hours} hours ago`;
};