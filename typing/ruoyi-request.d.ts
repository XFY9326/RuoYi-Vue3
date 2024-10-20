// noinspection JSUnusedGlobalSymbols
declare global {
    interface AjaxResult<T = any> extends Record<String, any> {
        code: number;
        msg: string;
        data: T?;
    }

    interface TableDataInfo<T = any> {
        code: number;
        msg: string;
        total: number;
        rows: Array<T>;
    }
}
export {};
