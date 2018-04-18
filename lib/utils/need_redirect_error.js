export default function NeedRedirectError(path) {
  this.path = path;
}

NeedRedirectError.prototype.toString = function toString() {
  return `NeedRedirectError(${this.path})`;
};
