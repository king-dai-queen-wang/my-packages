export interface ISetCollection {
  add: (value: any) => boolean;
  remove: (value) => boolean;
  has: (value) => boolean;
  clear: () => void;
  size: () => number;
  values: () => any[];
//  集合之间的操作（并交差子集）
  union: (otherSet: any) => ISetCollection;
  intersection: (otherSet: any) => ISetCollection;
  difference: (otherSet: any) => ISetCollection;
  // 判断当前集合是不是otherset的子集
  subSet: (otherSet: any) => boolean;
}

export class SetCollectionModel implements ISetCollection {
  items;
  constructor() {
    this.items = {};
  }

  add(value: any): boolean {
    if (this.has(value)) {
      return false;
    } else {
      this.items[value] = value;
      return true;
    }
  }
  clear() {
    this.items = {};
  }
  has(value): boolean {
    return this.items.hasOwnProperty(value);
  }
  remove(value): boolean {
    if (!this.has(value)) {
      return false;
    } else {
      delete this.items[value];
      return true;
    }
  }
  size(): number {
    return Object.keys(this.items).length;
  }
  values(): any[] {
    return Object.values(this.items);
  }
  // 并集
  union(otherSet: ISetCollection): ISetCollection {
    const unionSet = new SetCollectionModel();
    // 当前value 赋值给unionSet
    this.values().forEach(item => unionSet.add(item));
    otherSet.values().forEach(item => unionSet.add(item));
    return unionSet;
  }
  // 交集
  intersection(otherSet: ISetCollection): ISetCollection {
    const intersection = new SetCollectionModel();
    this.values().forEach(item => {
      if (otherSet.has(item)) {
        intersection.add(item);
      }
    });
    return intersection;
  }

  difference(otherSet: ISetCollection): ISetCollection {
    const intersection = new SetCollectionModel();
    // 获取当前set元素并且不在otherSet中，则返回，
    this.values().forEach(item => {
      if (!otherSet.has(item)) {
        intersection.add(item);
      }
    });
    return intersection;
  }

  subSet(otherSet: ISetCollection): boolean {
    // 获取当前set元素并且不在otherSet中，则返回，
    return this.values().every(item => {
      return otherSet.has(item);
    });
  }
}
