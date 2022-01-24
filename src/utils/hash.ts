// https://gist.github.com/hyamamoto/fd435505d29ebfa3d9716fd2be8d42f0

/* tslint:disable */
export const hashCode = function (s: string) {
  var h = 0, l = s.length, i = 0;
  if (l > 0)
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return Math.abs(h);
};
