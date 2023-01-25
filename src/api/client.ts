import type { $Fetch, FetchOptions, FetchResponse } from 'ofetch'
import { ofetch } from 'ofetch'

export type BackendResponseStatus = 'success' | 'fail'

interface IResponseError {
  code?: number
  message?: any
}

interface IResponse<T> {
  data?: T
  error?: IResponseError
}

export class BackendResponse<T> implements IResponse<T> {
  private _ts: number
  private _status: BackendResponseStatus
  private _statusCode: number

  public data?: T
  public error?: IResponseError

  constructor(
    status: BackendResponseStatus,
    res?: FetchResponse<IResponse<T>>,
    err?: Error
  ) {
    const _data: T | undefined = res?._data?.data
    const _error: IResponseError | undefined | null = res?._data?.error

    const _statusCode = res ? res.status : 0

    this._ts =
      res && res.headers.has('x-timestamp')
        ? parseInt(res.headers.get('x-timestamp')!)
        : -1
    this._status = status
    this._statusCode = _statusCode

    this.data = _data
    this.error = _error || err
  }

  public get ts(): number {
    return this._ts
  }

  public get status(): BackendResponseStatus {
    return this._status
  }

  public get statusCode(): number {
    return this._statusCode
  }
}

export class BackendClient {
  private _ofetch: $Fetch

  constructor(options: FetchOptions<'json'>) {
    this._ofetch = ofetch.create(options)
  }

  public request<T>(
    method: string,
    url: string,
    options: FetchOptions<'json'> = {}
  ): Promise<BackendResponse<T>> {
    return this._ofetch
      .raw<IResponse<T>>(url, {
        method,
        ...options,
      })
      .then((res) => {
        return new BackendResponse<T>('success', res)
      })
      .catch((err) => {
        return new BackendResponse('fail', undefined, err)
      })
  }
}
