
export const Timestampable = (constructor: Function) => {

  constructor.prototype.createdAt = null;
  constructor.prototype.updatedAt = null;

  constructor.prototype.transformTimestamps = function () {
    this.createdAt = new Date(this.createdAt);
    this.updatedAt = new Date(this.updatedAt);
  }
}
