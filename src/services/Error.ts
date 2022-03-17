export interface ErrorCustom {
    error: boolean,
    message: string,
    code?: string,
    stack?: string
}
export class ErrorCustom implements ErrorCustom { }

export class Error401 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "401";
        this.message = data.message,
        this.stack = data.stack
        this.error = true;
        return this
    }
}

export class Error400 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "400";
        this.message = data.message,
        this.stack = data.stack
        this.error = true;
        return this
    }
}

export class Error404 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "404";
        this.message = data.message,
        this.stack = data.stack
        this.error = true;
        return this
    }
}

export class Error500 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "500";
        this.message = data.message,
        this.stack = data.stack
        this.error = true;
        return this
    }
}

export class Error200 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "InfoError";
        this.message = data.message,
        this.stack = data.stack
        this.error = false;
        return this
    }
}

export class Error403 extends ErrorCustom {
    constructor(data: ErrorCustom) {
        super();
        let err = Error.apply(this, [data.message]);
        this.code = err.name = "403";
        this.message = data.message,
        this.stack = data.stack
        this.error = true;
        return this
    }
}