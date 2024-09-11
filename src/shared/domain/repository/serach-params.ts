import { ValueObject } from "../value-object";

export type SortDirection = "asc" | "desc";

export type SearchParamsConstructorProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams<Filter = string> extends ValueObject {
  protected _page: number;
  protected _per_page: number = 15;
  protected _sort: string | null;
  protected _sort_dir: SortDirection | null;
  protected _filter: Filter | null;

  constructor(props: SearchParamsConstructorProps<Filter> = {}) {
    super();
    this._page = props.page;
    this._per_page = props.per_page;
    this._sort = props.sort;
    this._sort_dir = props.sort_dir;
    this._filter = props.filter;
  }

  get page() {
    return this._page;
  }

  private set page(value: number) {
    let _page = value;

    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  get per_page() {
    return this._per_page;
  }

  private set per_page(value: number) {
    let _per_page = value === (true as any) ? this.per_page : +value;

    if (
      Number.isNaN(_per_page) ||
      _per_page <= 0 ||
      parseInt(_per_page as any) !== _per_page
    ) {
      _per_page = this._per_page;
    }

    this._per_page = _per_page;
  }

  get sort(): string | null {
    this._sort =
      value === null || value === undefined || value === "" ? null : `${value}`;
  }
}
