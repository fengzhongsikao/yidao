

export const getEarthlyBranchHour = (hour: number) => {
    return Math.floor(((hour + 1) % 24) / 2);
};

export const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要+1
    const day = String(now.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};