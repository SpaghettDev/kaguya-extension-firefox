export interface TimestampType {
    type: string;
    startTime: number;
    endTime: number;
}

export default function Timestamp(data: TimestampType) {
    return data;
}
