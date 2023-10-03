export function checkValidateText(value: any): string {
    if(value) {
        return value;
    }
    throw new Error("Invalid parammetter!!!");
}

export function checkValidateNumber(value: any): number {
    if(value) {
        return value;
    }
    throw new Error("Invalid parammetter!!!");
}