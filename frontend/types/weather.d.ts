export interface Weather {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day?: number;
    weathercode?: number;
    interval?: number;
}