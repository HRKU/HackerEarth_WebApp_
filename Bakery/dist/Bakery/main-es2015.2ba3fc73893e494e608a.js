(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function (t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function (t, e, n) {
      "use strict";
      function r(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let s = !1;
      const o = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            s &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          s = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return s;
        },
      };
      function i(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (o.useDeprecatedSynchronousErrorHandling) throw t;
            i(t);
          },
          complete() {},
        },
        l = (() =>
          Array.isArray || ((t) => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && (this._unsubscribe = t);
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _unsubscribe: s,
              _subscriptions: o,
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (r(s))
              try {
                s.call(this);
              } catch (i) {
                e = i instanceof u ? d(i.errors) : [i];
              }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (i) {
                    (e = e || []),
                      i instanceof u ? (e = e.concat(d(i.errors))) : e.push(i);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: r } = n;
            if (null === r) n._parentOrParents = this;
            else if (r instanceof t) {
              if (r === this) return n;
              n._parentOrParents = [r, this];
            } else {
              if (-1 !== r.indexOf(this)) return n;
              r.push(this);
            }
            const s = this._subscriptions;
            return null === s ? (this._subscriptions = [n]) : s.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function (t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new g(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new g(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const r = new f(t, e, n);
          return (r.syncErrorThrowable = !1), r;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class g extends f {
        constructor(t, e, n, s) {
          let o;
          super(), (this._parentSubscriber = t);
          let i = this;
          r(e)
            ? (o = e)
            : e &&
              ((o = e.next),
              (n = e.error),
              (s = e.complete),
              e !== a &&
                ((i = Object.create(e)),
                r(i.unsubscribe) && this.add(i.unsubscribe.bind(i)),
                (i.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = i),
            (this._next = o),
            (this._error = n),
            (this._complete = s);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            o.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = o;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : i(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              i(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              o.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), o.useDeprecatedSynchronousErrorHandling))
              throw n;
            i(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!o.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (r) {
            return o.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = r), (t.syncErrorThrown = !0), !0)
              : (i(r), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const m = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      function _(...t) {
        return v(t);
      }
      function v(t) {
        return 0 === t.length
          ? y
          : 1 === t.length
          ? t[0]
          : function (e) {
              return t.reduce((t, e) => e(t), e);
            };
      }
      let b = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: r } = this,
              s = (function (t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (s.add(
                r
                  ? r.call(s, this.source)
                  : this.source ||
                    (o.useDeprecatedSynchronousErrorHandling &&
                      !s.syncErrorThrowable)
                  ? this._subscribe(s)
                  : this._trySubscribe(s)
              ),
              o.useDeprecatedSynchronousErrorHandling &&
                s.syncErrorThrowable &&
                ((s.syncErrorThrowable = !1), s.syncErrorThrown))
            )
              throw s.syncErrorValue;
            return s;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              o.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function (t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: r } = t;
                    if (e || r) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = w(e))((e, n) => {
              let r;
              r = this.subscribe(
                (e) => {
                  try {
                    t(e);
                  } catch (s) {
                    n(s), r && r.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [m]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length ? this : v(t)(this);
          }
          toPromise(t) {
            return new (t = w(t))((t, e) => {
              let n;
              this.subscribe(
                (t) => (n = t),
                (t) => e(t),
                () => t(n)
              );
            });
          }
        }
        return (t.create = (e) => new t(e)), t;
      })();
      function w(t) {
        if ((t || (t = o.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const C = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class x extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class S extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let O = (() => {
        class t extends b {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new S(this);
          }
          lift(t) {
            const e = new k(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new C();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                r = e.slice();
              for (let s = 0; s < n; s++) r[s].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new C();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              r = e.slice();
            for (let s = 0; s < n; s++) r[s].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new C();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let r = 0; r < e; r++) n[r].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new C();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new C();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new x(this, t));
          }
          asObservable() {
            const t = new b();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new k(t, e)), t;
      })();
      class k extends O {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function E(t) {
        return t && "function" == typeof t.schedule;
      }
      class P extends f {
        constructor(t, e, n) {
          super(),
            (this.parent = t),
            (this.outerValue = e),
            (this.outerIndex = n),
            (this.index = 0);
        }
        _next(t) {
          this.parent.notifyNext(
            this.outerValue,
            t,
            this.outerIndex,
            this.index++,
            this
          );
        }
        _error(t) {
          this.parent.notifyError(t, this), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(this), this.unsubscribe();
        }
      }
      const T = (t) => (e) => {
        for (let n = 0, r = t.length; n < r && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function A() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const M = A(),
        R = (t) => t && "number" == typeof t.length && "function" != typeof t;
      function I(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const N = (t) => {
        if (t && "function" == typeof t[m])
          return (
            (r = t),
            (t) => {
              const e = r[m]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (R(t)) return T(t);
        if (I(t))
          return (
            (n = t),
            (t) => (
              n
                .then(
                  (e) => {
                    t.closed || (t.next(e), t.complete());
                  },
                  (e) => t.error(e)
                )
                .then(null, i),
              t
            )
          );
        if (t && "function" == typeof t[M])
          return (
            (e = t),
            (t) => {
              const n = e[M]();
              for (;;) {
                const e = n.next();
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, r;
      };
      function V(t, e, n, r, s = new P(t, n, r)) {
        if (!s.closed) return e instanceof b ? e.subscribe(s) : N(e)(s);
      }
      class j extends f {
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyError(t, e) {
          this.destination.error(t);
        }
        notifyComplete(t) {
          this.destination.complete();
        }
      }
      function D(t, e) {
        return function (n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new U(t, e));
        };
      }
      class U {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new F(t, this.project, this.thisArg));
        }
      }
      class F extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function L(t, e) {
        return new b((n) => {
          const r = new h();
          let s = 0;
          return (
            r.add(
              e.schedule(function () {
                s !== t.length
                  ? (n.next(t[s++]), n.closed || r.add(this.schedule()))
                  : n.complete();
              })
            ),
            r
          );
        });
      }
      function H(t, e) {
        return e
          ? (function (t, e) {
              if (null != t) {
                if (
                  (function (t) {
                    return t && "function" == typeof t[m];
                  })(t)
                )
                  return (function (t, e) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() => {
                            const s = t[m]();
                            r.add(
                              s.subscribe({
                                next(t) {
                                  r.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  r.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  r.add(e.schedule(() => n.complete()));
                                },
                              })
                            );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (I(t))
                  return (function (t, e) {
                    return new b((n) => {
                      const r = new h();
                      return (
                        r.add(
                          e.schedule(() =>
                            t.then(
                              (t) => {
                                r.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      r.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              (t) => {
                                r.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        r
                      );
                    });
                  })(t, e);
                if (R(t)) return L(t, e);
                if (
                  (function (t) {
                    return t && "function" == typeof t[M];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function (t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new b((n) => {
                      const r = new h();
                      let s;
                      return (
                        r.add(() => {
                          s && "function" == typeof s.return && s.return();
                        }),
                        r.add(
                          e.schedule(() => {
                            (s = t[M]()),
                              r.add(
                                e.schedule(function () {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = s.next();
                                    (t = n.value), (e = n.done);
                                  } catch (r) {
                                    return void n.error(r);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        r
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof b
          ? t
          : new b(N(t));
      }
      function z(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? (r) =>
              r.pipe(
                z((n, r) => H(t(n, r)).pipe(D((t, s) => e(n, t, r, s))), n)
              )
          : ("number" == typeof e && (n = e), (e) => e.lift(new $(t, n)));
      }
      class $ {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new q(t, this.project, this.concurrent));
        }
      }
      class q extends j {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this.active++, this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = new P(this, e, n),
            s = this.destination;
          s.add(r);
          const o = V(this, t, void 0, void 0, r);
          o !== r && s.add(o);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
        notifyComplete(t) {
          const e = this.buffer;
          this.remove(t),
            this.active--,
            e.length > 0
              ? this._next(e.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function B(t = Number.POSITIVE_INFINITY) {
        return z(y, t);
      }
      function G(t, e) {
        return e ? L(t, e) : new b(T(t));
      }
      function W() {
        return function (t) {
          return t.lift(new Z(t));
        };
      }
      class Z {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const r = new Q(t, n),
            s = e.subscribe(r);
          return r.closed || (r.connection = n.connect()), s;
        }
      }
      class Q extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            r = t._connection;
          (this.connection = null), !r || (n && r !== n) || r.unsubscribe();
        }
      }
      class K extends b {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new Y(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return W()(this);
        }
      }
      const J = (() => {
        const t = K.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount },
        };
      })();
      class Y extends S {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function X() {
        return new O();
      }
      function tt(t) {
        return { toString: t }.toString();
      }
      function et(t, e, n) {
        return tt(() => {
          const r = (function (t) {
            return function (...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function s(...t) {
            if (this instanceof s) return r.apply(this, t), this;
            const e = new s(...t);
            return (n.annotation = e), n;
            function n(t, n, r) {
              const s = t.hasOwnProperty("__parameters__")
                ? t.__parameters__
                : Object.defineProperty(t, "__parameters__", { value: [] })
                    .__parameters__;
              for (; s.length <= r; ) s.push(null);
              return (s[r] = s[r] || []).push(e), t;
            }
          }
          return (
            n && (s.prototype = Object.create(n.prototype)),
            (s.prototype.ngMetadataName = t),
            (s.annotationCls = s),
            s
          );
        });
      }
      const nt = et("Inject", (t) => ({ token: t })),
        rt = et("Optional"),
        st = et("Self"),
        ot = et("SkipSelf");
      var it = (function (t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      function at(t) {
        for (let e in t) if (t[e] === at) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function lt(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function ct(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0,
        };
      }
      function ut(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || [],
        };
      }
      function ht(t) {
        return dt(t, t[ft]) || dt(t, t[yt]);
      }
      function dt(t, e) {
        return e && e.token === t ? e : null;
      }
      function pt(t) {
        return t && (t.hasOwnProperty(gt) || t.hasOwnProperty(_t))
          ? t[gt]
          : null;
      }
      const ft = at({ "\u0275prov": at }),
        gt = at({ "\u0275inj": at }),
        mt = at({ "\u0275provFallback": at }),
        yt = at({ ngInjectableDef: at }),
        _t = at({ ngInjectorDef: at });
      function vt(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(vt).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function bt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const wt = at({ __forward_ref__: at });
      function Ct(t) {
        return (
          (t.__forward_ref__ = Ct),
          (t.toString = function () {
            return vt(this());
          }),
          t
        );
      }
      function xt(t) {
        return St(t) ? t() : t;
      }
      function St(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(wt) &&
          t.__forward_ref__ === Ct
        );
      }
      const Ot = "undefined" != typeof globalThis && globalThis,
        kt = "undefined" != typeof window && window,
        Et =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        Pt = "undefined" != typeof global && global,
        Tt = Ot || Pt || kt || Et,
        At = at({ "\u0275cmp": at }),
        Mt = at({ "\u0275dir": at }),
        Rt = at({ "\u0275pipe": at }),
        It = at({ "\u0275mod": at }),
        Nt = at({ "\u0275loc": at }),
        Vt = at({ "\u0275fac": at }),
        jt = at({ __NG_ELEMENT_ID__: at });
      class Dt {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = ct({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory,
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      const Ut = new Dt("INJECTOR", -1),
        Ft = {},
        Lt = /\n/gm,
        Ht = at({ provide: String, useValue: at });
      let zt,
        $t = void 0;
      function qt(t) {
        const e = $t;
        return ($t = t), e;
      }
      function Bt(t) {
        const e = zt;
        return (zt = t), e;
      }
      function Gt(t, e = it.Default) {
        if (void 0 === $t)
          throw new Error("inject() must be called from an injection context");
        return null === $t
          ? Zt(t, void 0, e)
          : $t.get(t, e & it.Optional ? null : void 0, e);
      }
      function Wt(t, e = it.Default) {
        return (zt || Gt)(xt(t), e);
      }
      function Zt(t, e, n) {
        const r = ht(t);
        if (r && "root" == r.providedIn)
          return void 0 === r.value ? (r.value = r.factory()) : r.value;
        if (n & it.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${vt(t)}]`);
      }
      function Qt(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const r = xt(t[n]);
          if (Array.isArray(r)) {
            if (0 === r.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = it.Default;
            for (let e = 0; e < r.length; e++) {
              const s = r[e];
              s instanceof rt || "Optional" === s.ngMetadataName || s === rt
                ? (n |= it.Optional)
                : s instanceof ot || "SkipSelf" === s.ngMetadataName || s === ot
                ? (n |= it.SkipSelf)
                : s instanceof st || "Self" === s.ngMetadataName || s === st
                ? (n |= it.Self)
                : (t = s instanceof nt || s === nt ? s.token : s);
            }
            e.push(Wt(t, n));
          } else e.push(Wt(r));
        }
        return e;
      }
      class Kt {
        get(t, e = Ft) {
          if (e === Ft) {
            const e = new Error(`NullInjectorError: No provider for ${vt(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      class Jt {}
      class Yt {}
      function Xt(t, e) {
        t.forEach((t) => (Array.isArray(t) ? Xt(t, e) : e(t)));
      }
      function te(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function ee(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function ne(t, e) {
        const n = [];
        for (let r = 0; r < t; r++) n.push(e);
        return n;
      }
      function re(t, e, n) {
        let r = oe(t, e);
        return (
          r >= 0
            ? (t[1 | r] = n)
            : ((r = ~r),
              (function (t, e, n, r) {
                let s = t.length;
                if (s == e) t.push(n, r);
                else if (1 === s) t.push(r, t[0]), (t[0] = n);
                else {
                  for (s--, t.push(t[s - 1], t[s]); s > e; )
                    (t[s] = t[s - 2]), s--;
                  (t[e] = n), (t[e + 1] = r);
                }
              })(t, r, e, n)),
          r
        );
      }
      function se(t, e) {
        const n = oe(t, e);
        if (n >= 0) return t[1 | n];
      }
      function oe(t, e) {
        return (function (t, e, n) {
          let r = 0,
            s = t.length >> 1;
          for (; s !== r; ) {
            const n = r + ((s - r) >> 1),
              o = t[n << 1];
            if (e === o) return n << 1;
            o > e ? (s = n) : (r = n + 1);
          }
          return ~(s << 1);
        })(t, e);
      }
      const ie = (function () {
          var t = { OnPush: 0, Default: 1 };
          return (t[t.OnPush] = "OnPush"), (t[t.Default] = "Default"), t;
        })(),
        ae = (function () {
          var t = { Emulated: 0, Native: 1, None: 2, ShadowDom: 3 };
          return (
            (t[t.Emulated] = "Emulated"),
            (t[t.Native] = "Native"),
            (t[t.None] = "None"),
            (t[t.ShadowDom] = "ShadowDom"),
            t
          );
        })(),
        le = {},
        ce = [];
      let ue = 0;
      function he(t) {
        return tt(() => {
          const e = t.type,
            n = e.prototype,
            r = {},
            s = {
              type: e,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: r,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onChanges: null,
              onInit: n.ngOnInit || null,
              doCheck: n.ngDoCheck || null,
              afterContentInit: n.ngAfterContentInit || null,
              afterContentChecked: n.ngAfterContentChecked || null,
              afterViewInit: n.ngAfterViewInit || null,
              afterViewChecked: n.ngAfterViewChecked || null,
              onDestroy: n.ngOnDestroy || null,
              onPush: t.changeDetection === ie.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || ce,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || ae.Emulated,
              id: "c",
              styles: t.styles || ce,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null,
            },
            o = t.directives,
            i = t.features,
            a = t.pipes;
          return (
            (s.id += ue++),
            (s.inputs = me(t.inputs, r)),
            (s.outputs = me(t.outputs)),
            i && i.forEach((t) => t(s)),
            (s.directiveDefs = o
              ? () => ("function" == typeof o ? o() : o).map(de)
              : null),
            (s.pipeDefs = a
              ? () => ("function" == typeof a ? a() : a).map(pe)
              : null),
            s
          );
        });
      }
      function de(t) {
        return (
          _e(t) ||
          (function (t) {
            return t[Mt] || null;
          })(t)
        );
      }
      function pe(t) {
        return (function (t) {
          return t[Rt] || null;
        })(t);
      }
      const fe = {};
      function ge(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || ce,
          declarations: t.declarations || ce,
          imports: t.imports || ce,
          exports: t.exports || ce,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null,
        };
        return (
          null != t.id &&
            tt(() => {
              fe[t.id] = t.type;
            }),
          e
        );
      }
      function me(t, e) {
        if (null == t) return le;
        const n = {};
        for (const r in t)
          if (t.hasOwnProperty(r)) {
            let s = t[r],
              o = s;
            Array.isArray(s) && ((o = s[1]), (s = s[0])),
              (n[s] = r),
              e && (e[s] = o);
          }
        return n;
      }
      const ye = he;
      function _e(t) {
        return t[At] || null;
      }
      function ve(t, e) {
        return t.hasOwnProperty(Vt) ? t[Vt] : null;
      }
      function be(t, e) {
        const n = t[It] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${vt(t)} does not have '\u0275mod' property.`);
        return n;
      }
      function we(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Ce(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function xe(t) {
        return 0 != (8 & t.flags);
      }
      function Se(t) {
        return 2 == (2 & t.flags);
      }
      function Oe(t) {
        return 1 == (1 & t.flags);
      }
      function ke(t) {
        return null !== t.template;
      }
      function Ee(t) {
        return 0 != (512 & t[2]);
      }
      let Pe = void 0;
      function Te(t) {
        return !!t.listen;
      }
      const Ae = {
        createRenderer: (t, e) =>
          void 0 !== Pe
            ? Pe
            : "undefined" != typeof document
            ? document
            : void 0,
      };
      function Me(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function Re(t, e) {
        return Me(e[t + 20]);
      }
      function Ie(t, e) {
        return Me(e[t.index]);
      }
      function Ne(t, e) {
        return t.data[e + 20];
      }
      function Ve(t, e) {
        const n = e[t];
        return we(n) ? n : n[0];
      }
      function je(t) {
        const e = (function (t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function De(t) {
        return 4 == (4 & t[2]);
      }
      function Ue(t) {
        return 128 == (128 & t[2]);
      }
      function Fe(t, e) {
        return null === t || null == e ? null : t[e];
      }
      function Le(t) {
        t[18] = 0;
      }
      function He(t, e) {
        t[5] += e;
        let n = t,
          r = t[3];
        for (
          ;
          null !== r && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (r[5] += e), (n = r), (r = r[3]);
      }
      const ze = {
        lFrame: cn(null),
        bindingsEnabled: !0,
        checkNoChangesMode: !1,
      };
      function $e() {
        return ze.bindingsEnabled;
      }
      function qe() {
        return ze.lFrame.lView;
      }
      function Be() {
        return ze.lFrame.tView;
      }
      function Ge(t) {
        ze.lFrame.contextLView = t;
      }
      function We() {
        return ze.lFrame.previousOrParentTNode;
      }
      function Ze(t, e) {
        (ze.lFrame.previousOrParentTNode = t), (ze.lFrame.isParent = e);
      }
      function Qe() {
        return ze.lFrame.isParent;
      }
      function Ke() {
        ze.lFrame.isParent = !1;
      }
      function Je() {
        return ze.checkNoChangesMode;
      }
      function Ye(t) {
        ze.checkNoChangesMode = t;
      }
      function Xe() {
        return ze.lFrame.bindingIndex++;
      }
      function tn(t) {
        const e = ze.lFrame,
          n = e.bindingIndex;
        return (e.bindingIndex = e.bindingIndex + t), n;
      }
      function en(t, e) {
        const n = ze.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), nn(e);
      }
      function nn(t) {
        ze.lFrame.currentDirectiveIndex = t;
      }
      function rn() {
        return ze.lFrame.currentQueryIndex;
      }
      function sn(t) {
        ze.lFrame.currentQueryIndex = t;
      }
      function on(t, e) {
        const n = ln();
        (ze.lFrame = n), (n.previousOrParentTNode = e), (n.lView = t);
      }
      function an(t, e) {
        const n = ln(),
          r = t[1];
        (ze.lFrame = n),
          (n.previousOrParentTNode = e),
          (n.lView = t),
          (n.tView = r),
          (n.contextLView = t),
          (n.bindingIndex = r.bindingStartIndex);
      }
      function ln() {
        const t = ze.lFrame,
          e = null === t ? null : t.child;
        return null === e ? cn(t) : e;
      }
      function cn(t) {
        const e = {
          previousOrParentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: 0,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentSanitizer: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
        };
        return null !== t && (t.child = e), e;
      }
      function un() {
        const t = ze.lFrame;
        return (
          (ze.lFrame = t.parent),
          (t.previousOrParentTNode = null),
          (t.lView = null),
          t
        );
      }
      const hn = un;
      function dn() {
        const t = un();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = 0),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.currentSanitizer = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function pn() {
        return ze.lFrame.selectedIndex;
      }
      function fn(t) {
        ze.lFrame.selectedIndex = t;
      }
      function gn() {
        const t = ze.lFrame;
        return Ne(t.tView, t.selectedIndex);
      }
      function mn(t, e) {
        for (let n = e.directiveStart, r = e.directiveEnd; n < r; n++) {
          const e = t.data[n];
          e.afterContentInit &&
            (t.contentHooks || (t.contentHooks = [])).push(
              -n,
              e.afterContentInit
            ),
            e.afterContentChecked &&
              ((t.contentHooks || (t.contentHooks = [])).push(
                n,
                e.afterContentChecked
              ),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(
                n,
                e.afterContentChecked
              )),
            e.afterViewInit &&
              (t.viewHooks || (t.viewHooks = [])).push(-n, e.afterViewInit),
            e.afterViewChecked &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, e.afterViewChecked),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(
                n,
                e.afterViewChecked
              )),
            null != e.onDestroy &&
              (t.destroyHooks || (t.destroyHooks = [])).push(n, e.onDestroy);
        }
      }
      function yn(t, e, n) {
        bn(t, e, 3, n);
      }
      function _n(t, e, n, r) {
        (3 & t[2]) === n && bn(t, e, n, r);
      }
      function vn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function bn(t, e, n, r) {
        const s = null != r ? r : -1;
        let o = 0;
        for (let i = void 0 !== r ? 65535 & t[18] : 0; i < e.length; i++)
          if ("number" == typeof e[i + 1]) {
            if (((o = e[i]), null != r && o >= r)) break;
          } else
            e[i] < 0 && (t[18] += 65536),
              (o < s || -1 == s) &&
                (wn(t, n, e, i), (t[18] = (4294901760 & t[18]) + i + 2)),
              i++;
      }
      function wn(t, e, n, r) {
        const s = n[r] < 0,
          o = n[r + 1],
          i = t[s ? -n[r] : n[r]];
        s
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), o.call(i))
          : o.call(i);
      }
      class Cn {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function xn(t, e, n) {
        const r = Te(t);
        let s = 0;
        for (; s < n.length; ) {
          const o = n[s];
          if ("number" == typeof o) {
            if (0 !== o) break;
            s++;
            const i = n[s++],
              a = n[s++],
              l = n[s++];
            r ? t.setAttribute(e, a, l, i) : e.setAttributeNS(i, a, l);
          } else {
            const i = o,
              a = n[++s];
            On(i)
              ? r && t.setProperty(e, i, a)
              : r
              ? t.setAttribute(e, i, a)
              : e.setAttribute(i, a),
              s++;
          }
        }
        return s;
      }
      function Sn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function On(t) {
        return 64 === t.charCodeAt(0);
      }
      function kn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let r = 0; r < e.length; r++) {
            const s = e[r];
            "number" == typeof s
              ? (n = s)
              : 0 === n ||
                En(t, n, s, null, -1 === n || 2 === n ? e[++r] : null);
          }
        }
        return t;
      }
      function En(t, e, n, r, s) {
        let o = 0,
          i = t.length;
        if (-1 === e) i = -1;
        else
          for (; o < t.length; ) {
            const n = t[o++];
            if ("number" == typeof n) {
              if (n === e) {
                i = -1;
                break;
              }
              if (n > e) {
                i = o - 1;
                break;
              }
            }
          }
        for (; o < t.length; ) {
          const e = t[o];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === r) return void (null !== s && (t[o + 1] = s));
            if (r === t[o + 1]) return void (t[o + 2] = s);
          }
          o++, null !== r && o++, null !== s && o++;
        }
        -1 !== i && (t.splice(i, 0, e), (o = i + 1)),
          t.splice(o++, 0, n),
          null !== r && t.splice(o++, 0, r),
          null !== s && t.splice(o++, 0, s);
      }
      function Pn(t) {
        return -1 !== t;
      }
      function Tn(t) {
        return 32767 & t;
      }
      function An(t) {
        return t >> 16;
      }
      function Mn(t, e) {
        let n = An(t),
          r = e;
        for (; n > 0; ) (r = r[15]), n--;
        return r;
      }
      function Rn(t) {
        return "string" == typeof t ? t : null == t ? "" : "" + t;
      }
      function In(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : Rn(t);
      }
      const Nn = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(Tt))();
      function Vn(t) {
        return t instanceof Function ? t() : t;
      }
      let jn = !0;
      function Dn(t) {
        const e = jn;
        return (jn = t), e;
      }
      let Un = 0;
      function Fn(t, e) {
        const n = Hn(t, e);
        if (-1 !== n) return n;
        const r = e[1];
        r.firstCreatePass &&
          ((t.injectorIndex = e.length),
          Ln(r.data, t),
          Ln(e, null),
          Ln(r.blueprint, null));
        const s = zn(t, e),
          o = t.injectorIndex;
        if (Pn(s)) {
          const t = Tn(s),
            n = Mn(s, e),
            r = n[1].data;
          for (let s = 0; s < 8; s++) e[o + s] = n[t + s] | r[t + s];
        }
        return (e[o + 8] = s), o;
      }
      function Ln(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function Hn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null == e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function zn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = e[6],
          r = 1;
        for (; n && -1 === n.injectorIndex; )
          (n = (e = e[15]) ? e[6] : null), r++;
        return n ? n.injectorIndex | (r << 16) : -1;
      }
      function $n(t, e, n) {
        !(function (t, e, n) {
          let r = "string" != typeof n ? n[jt] : n.charCodeAt(0) || 0;
          null == r && (r = n[jt] = Un++);
          const s = 255 & r,
            o = 1 << s,
            i = 64 & s,
            a = 32 & s,
            l = e.data;
          128 & s
            ? i
              ? a
                ? (l[t + 7] |= o)
                : (l[t + 6] |= o)
              : a
              ? (l[t + 5] |= o)
              : (l[t + 4] |= o)
            : i
            ? a
              ? (l[t + 3] |= o)
              : (l[t + 2] |= o)
            : a
            ? (l[t + 1] |= o)
            : (l[t] |= o);
        })(t, e, n);
      }
      function qn(t, e, n, r = it.Default, s) {
        if (null !== t) {
          const s = (function (t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t[jt];
            return "number" == typeof e && e > 0 ? 255 & e : e;
          })(n);
          if ("function" == typeof s) {
            on(e, t);
            try {
              const t = s();
              if (null != t || r & it.Optional) return t;
              throw new Error(`No provider for ${In(n)}!`);
            } finally {
              hn();
            }
          } else if ("number" == typeof s) {
            if (-1 === s) return new Jn(t, e);
            let o = null,
              i = Hn(t, e),
              a = -1,
              l = r & it.Host ? e[16][6] : null;
            for (
              (-1 === i || r & it.SkipSelf) &&
              ((a = -1 === i ? zn(t, e) : e[i + 8]),
              Kn(r, !1) ? ((o = e[1]), (i = Tn(a)), (e = Mn(a, e))) : (i = -1));
              -1 !== i;

            ) {
              a = e[i + 8];
              const t = e[1];
              if (Qn(s, i, t.data)) {
                const t = Gn(i, e, n, o, r, l);
                if (t !== Bn) return t;
              }
              Kn(r, e[1].data[i + 8] === l) && Qn(s, i, e)
                ? ((o = t), (i = Tn(a)), (e = Mn(a, e)))
                : (i = -1);
            }
          }
        }
        if (
          (r & it.Optional && void 0 === s && (s = null),
          0 == (r & (it.Self | it.Host)))
        ) {
          const t = e[9],
            o = Bt(void 0);
          try {
            return t ? t.get(n, s, r & it.Optional) : Zt(n, s, r & it.Optional);
          } finally {
            Bt(o);
          }
        }
        if (r & it.Optional) return s;
        throw new Error(`NodeInjector: NOT_FOUND [${In(n)}]`);
      }
      const Bn = {};
      function Gn(t, e, n, r, s, o) {
        const i = e[1],
          a = i.data[t + 8],
          l = Wn(
            a,
            i,
            n,
            null == r ? Se(a) && jn : r != i && 3 === a.type,
            s & it.Host && o === a
          );
        return null !== l ? Zn(e, i, l, a) : Bn;
      }
      function Wn(t, e, n, r, s) {
        const o = t.providerIndexes,
          i = e.data,
          a = 65535 & o,
          l = t.directiveStart,
          c = o >> 16,
          u = s ? a + c : t.directiveEnd;
        for (let h = r ? a : a + c; h < u; h++) {
          const t = i[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (s) {
          const t = i[l];
          if (t && ke(t) && t.type === n) return l;
        }
        return null;
      }
      function Zn(t, e, n, r) {
        let s = t[n];
        const o = e.data;
        if (s instanceof Cn) {
          const i = s;
          if (i.resolving) throw new Error("Circular dep for " + In(o[n]));
          const a = Dn(i.canSeeViewProviders);
          let l;
          (i.resolving = !0), i.injectImpl && (l = Bt(i.injectImpl)), on(t, r);
          try {
            (s = t[n] = i.factory(void 0, o, t, r)),
              e.firstCreatePass &&
                n >= r.directiveStart &&
                (function (t, e, n) {
                  const { onChanges: r, onInit: s, doCheck: o } = e;
                  r &&
                    ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, r),
                    (n.preOrderCheckHooks || (n.preOrderCheckHooks = [])).push(
                      t,
                      r
                    )),
                    s &&
                      (n.preOrderHooks || (n.preOrderHooks = [])).push(-t, s),
                    o &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, o),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, o));
                })(n, o[n], e);
          } finally {
            i.injectImpl && Bt(l), Dn(a), (i.resolving = !1), hn();
          }
        }
        return s;
      }
      function Qn(t, e, n) {
        const r = 64 & t,
          s = 32 & t;
        let o;
        return (
          (o =
            128 & t
              ? r
                ? s
                  ? n[e + 7]
                  : n[e + 6]
                : s
                ? n[e + 5]
                : n[e + 4]
              : r
              ? s
                ? n[e + 3]
                : n[e + 2]
              : s
              ? n[e + 1]
              : n[e]),
          !!(o & (1 << t))
        );
      }
      function Kn(t, e) {
        return !(t & it.Self || (t & it.Host && e));
      }
      class Jn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return qn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Yn(t) {
        return tt(() => {
          const e = Object.getPrototypeOf(t.prototype).constructor,
            n =
              e[Vt] ||
              (function t(e) {
                const n = e;
                if (St(e))
                  return () => {
                    const e = t(xt(n));
                    return e ? e() : null;
                  };
                let r = ve(n);
                if (null === r) {
                  const t = pt(n);
                  r = t && t.factory;
                }
                return r || null;
              })(e);
          return null !== n ? n : (t) => new t();
        });
      }
      function Xn(t) {
        return t.ngDebugContext;
      }
      function tr(t) {
        return t.ngOriginalError;
      }
      function er(t, ...e) {
        t.error(...e);
      }
      class nr {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            r = (function (t) {
              return t.ngErrorLogger || er;
            })(t);
          r(this._console, "ERROR", t),
            e && r(this._console, "ORIGINAL ERROR", e),
            n && r(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (Xn(t) ? Xn(t) : this._findContext(tr(t))) : null;
        }
        _findOriginalError(t) {
          let e = tr(t);
          for (; e && tr(e); ) e = tr(e);
          return e;
        }
      }
      class rr {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see http://g.co/ng/security#xss)"
          );
        }
      }
      function sr(t) {
        return t instanceof rr ? t.changingThisBreaksApplicationSecurity : t;
      }
      let or = !0,
        ir = !1;
      function ar() {
        return (ir = !0), or;
      }
      const lr = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
        cr =
          /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i,
        ur = (function () {
          var t = {
            NONE: 0,
            HTML: 1,
            STYLE: 2,
            SCRIPT: 3,
            URL: 4,
            RESOURCE_URL: 5,
          };
          return (
            (t[t.NONE] = "NONE"),
            (t[t.HTML] = "HTML"),
            (t[t.STYLE] = "STYLE"),
            (t[t.SCRIPT] = "SCRIPT"),
            (t[t.URL] = "URL"),
            (t[t.RESOURCE_URL] = "RESOURCE_URL"),
            t
          );
        })();
      function hr(t) {
        const e = (function () {
          const t = qe();
          return t && t[12];
        })();
        return e
          ? e.sanitize(ur.URL, t) || ""
          : (function (t, e) {
              const n = (function (t) {
                return (t instanceof rr && t.getTypeName()) || null;
              })(t);
              if (null != n && n !== e) {
                if ("ResourceURL" === n && "URL" === e) return !0;
                throw new Error(
                  `Required a safe ${e}, got a ${n} (see http://g.co/ng/security#xss)`
                );
              }
              return n === e;
            })(t, "URL")
          ? sr(t)
          : ((n = Rn(t)),
            (n = String(n)).match(lr) || n.match(cr)
              ? n
              : (ar() &&
                  console.warn(
                    `WARNING: sanitizing unsafe URL value ${n} (see http://g.co/ng/security#xss)`
                  ),
                "unsafe:" + n));
        var n;
      }
      function dr(t, e) {
        t.__ngContext__ = e;
      }
      function pr(t) {
        throw new Error(
          "Multiple components match node with tagname " + t.tagName
        );
      }
      function fr() {
        throw new Error("Cannot mix multi providers and regular providers");
      }
      function gr(t, e, n) {
        let r = t.length;
        for (;;) {
          const s = t.indexOf(e, n);
          if (-1 === s) return s;
          if (0 === s || t.charCodeAt(s - 1) <= 32) {
            const n = e.length;
            if (s + n === r || t.charCodeAt(s + n) <= 32) return s;
          }
          n = s + 1;
        }
      }
      function mr(t, e, n) {
        let r = 0;
        for (; r < t.length; ) {
          let s = t[r++];
          if (n && "class" === s) {
            if (((s = t[r]), -1 !== gr(s.toLowerCase(), e, 0))) return !0;
          } else if (1 === s) {
            for (; r < t.length && "string" == typeof (s = t[r++]); )
              if (s.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function yr(t) {
        return 0 === t.type && "ng-template" !== t.tagName;
      }
      function _r(t, e, n) {
        return e === (0 !== t.type || n ? t.tagName : "ng-template");
      }
      function vr(t, e, n) {
        let r = 4;
        const s = t.attrs || [],
          o = (function (t) {
            for (let e = 0; e < t.length; e++) if (Sn(t[e])) return e;
            return t.length;
          })(s);
        let i = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== l && !_r(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (br(r)) return !1;
                  i = !0;
                }
              } else {
                const c = 8 & r ? l : e[++a];
                if (8 & r && null !== t.attrs) {
                  if (!mr(t.attrs, c, n)) {
                    if (br(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const u = wr(8 & r ? "class" : l, s, yr(t), n);
                if (-1 === u) {
                  if (br(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > o ? "" : s[u + 1].toLowerCase();
                  const e = 8 & r ? t : null;
                  if ((e && -1 !== gr(e, c, 0)) || (2 & r && c !== t)) {
                    if (br(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !br(r) && !br(l)) return !1;
            if (i && br(l)) continue;
            (i = !1), (r = l | (1 & r));
          }
        }
        return br(r) || i;
      }
      function br(t) {
        return 0 == (1 & t);
      }
      function wr(t, e, n, r) {
        if (null === e) return -1;
        let s = 0;
        if (r || !n) {
          let n = !1;
          for (; s < e.length; ) {
            const r = e[s];
            if (r === t) return s;
            if (3 === r || 6 === r) n = !0;
            else {
              if (1 === r || 2 === r) {
                let t = e[++s];
                for (; "string" == typeof t; ) t = e[++s];
                continue;
              }
              if (4 === r) break;
              if (0 === r) {
                s += 4;
                continue;
              }
            }
            s += n ? 1 : 2;
          }
          return -1;
        }
        return (function (t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const r = t[n];
              if ("number" == typeof r) return -1;
              if (r === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Cr(t, e, n = !1) {
        for (let r = 0; r < e.length; r++) if (vr(t, e[r], n)) return !0;
        return !1;
      }
      function xr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Sr(t) {
        let e = t[0],
          n = 1,
          r = 2,
          s = "",
          o = !1;
        for (; n < t.length; ) {
          let i = t[n];
          if ("string" == typeof i)
            if (2 & r) {
              const e = t[++n];
              s += "[" + i + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & r ? (s += "." + i) : 4 & r && (s += " " + i);
          else
            "" === s || br(i) || ((e += xr(o, s)), (s = "")),
              (r = i),
              (o = o || !br(r));
          n++;
        }
        return "" !== s && (e += xr(o, s)), e;
      }
      const Or = {};
      function kr(t) {
        const e = t[3];
        return Ce(e) ? e[3] : e;
      }
      function Er(t) {
        return Tr(t[13]);
      }
      function Pr(t) {
        return Tr(t[4]);
      }
      function Tr(t) {
        for (; null !== t && !Ce(t); ) t = t[4];
        return t;
      }
      function Ar(t) {
        Mr(Be(), qe(), pn() + t, Je());
      }
      function Mr(t, e, n, r) {
        if (!r)
          if (3 == (3 & e[2])) {
            const r = t.preOrderCheckHooks;
            null !== r && yn(e, r, n);
          } else {
            const r = t.preOrderHooks;
            null !== r && _n(e, r, 0, n);
          }
        fn(n);
      }
      function Rr(t, e) {
        return (t << 17) | (e << 2);
      }
      function Ir(t) {
        return (t >> 17) & 32767;
      }
      function Nr(t) {
        return 2 | t;
      }
      function Vr(t) {
        return (131068 & t) >> 2;
      }
      function jr(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function Dr(t) {
        return 1 | t;
      }
      function Ur(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r],
              o = n[r + 1];
            if (-1 !== o) {
              const n = t.data[o];
              sn(s), n.contentQueries(2, e[o], o);
            }
          }
      }
      function Fr(t, e, n) {
        return Te(e)
          ? e.createElement(t, n)
          : null === n
          ? e.createElement(t)
          : e.createElementNS(n, t);
      }
      function Lr(t, e, n, r, s, o, i, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = s),
          (u[2] = 140 | r),
          Le(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = i || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = o),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Hr(t, e, n, r, s, o) {
        const i = n + 20,
          a =
            t.data[i] ||
            (function (t, e, n, r, s, o) {
              const i = We(),
                a = Qe(),
                l = a ? i : i && i.parent,
                c = (t.data[n] = Kr(0, l && l !== e ? l : null, r, n, s, o));
              return (
                null === t.firstChild && (t.firstChild = c),
                i &&
                  (!a || null != i.child || (null === c.parent && 2 !== i.type)
                    ? a || (i.next = c)
                    : (i.child = c)),
                c
              );
            })(t, e, i, r, s, o);
        return Ze(a, !0), a;
      }
      function zr(t, e, n) {
        an(e, e[6]);
        try {
          const r = t.viewQuery;
          null !== r && _s(1, r, n);
          const s = t.template;
          null !== s && Br(t, e, s, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && Ur(t, e),
            t.staticViewQueries && _s(2, t.viewQuery, n);
          const o = t.components;
          null !== o &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ps(t, e[n]);
            })(e, o);
        } catch (r) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), r);
        } finally {
          (e[2] &= -5), dn();
        }
      }
      function $r(t, e, n, r) {
        const s = e[2];
        if (256 == (256 & s)) return;
        an(e, e[6]);
        const o = Je();
        try {
          Le(e),
            (ze.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Br(t, e, n, 2, r);
          const i = 3 == (3 & s);
          if (!o)
            if (i) {
              const n = t.preOrderCheckHooks;
              null !== n && yn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && _n(e, n, 0, null), vn(e, 0);
            }
          if (
            ((function (t) {
              for (let e = Er(t); null !== e; e = Pr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    r = n[3];
                  0 == (1024 & n[2]) && He(r, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function (t) {
              for (let e = Er(t); null !== e; e = Pr(e))
                for (let t = 10; t < e.length; t++) {
                  const n = e[t],
                    r = n[1];
                  Ue(n) && $r(r, n, r.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && Ur(t, e),
            !o)
          )
            if (i) {
              const n = t.contentCheckHooks;
              null !== n && yn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && _n(e, n, 1), vn(e, 1);
            }
          !(function (t, e) {
            try {
              const n = t.expandoInstructions;
              if (null !== n) {
                let r = t.expandoStartIndex,
                  s = -1,
                  o = -1;
                for (let t = 0; t < n.length; t++) {
                  const i = n[t];
                  "number" == typeof i
                    ? i <= 0
                      ? ((o = 0 - i), fn(o), (r += 9 + n[++t]), (s = r))
                      : (r += i)
                    : (null !== i && (en(r, s), i(2, e[s])), s++);
                }
              }
            } finally {
              fn(-1);
            }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function (t, e) {
              for (let n = 0; n < e.length; n++) ds(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && _s(2, l, r), !o))
            if (i) {
              const n = t.viewCheckHooks;
              null !== n && yn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && _n(e, n, 2), vn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            o || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), He(e[3], -1));
        } finally {
          dn();
        }
      }
      function qr(t, e, n, r) {
        const s = e[10],
          o = !Je(),
          i = De(e);
        try {
          o && !i && s.begin && s.begin(), i && zr(t, e, r), $r(t, e, n, r);
        } finally {
          o && !i && s.end && s.end();
        }
      }
      function Br(t, e, n, r, s) {
        const o = pn();
        try {
          fn(-1), 2 & r && e.length > 20 && Mr(t, e, 0, Je()), n(r, s);
        } finally {
          fn(o);
        }
      }
      function Gr(t, e, n) {
        $e() &&
          ((function (t, e, n, r) {
            const s = n.directiveStart,
              o = n.directiveEnd;
            t.firstCreatePass || Fn(n, e), dr(r, e);
            const i = n.initialInputs;
            for (let a = s; a < o; a++) {
              const r = t.data[a],
                o = ke(r);
              o && ls(e, n, r);
              const l = Zn(e, t, a, n);
              dr(l, e),
                null !== i && cs(0, a - s, l, r, 0, i),
                o && (Ve(n.index, e)[8] = l);
            }
          })(t, e, n, Ie(n, e)),
          128 == (128 & n.flags) &&
            (function (t, e, n) {
              const r = n.directiveStart,
                s = n.directiveEnd,
                o = t.expandoInstructions,
                i = t.firstCreatePass,
                a = n.index - 20,
                l = ze.lFrame.currentDirectiveIndex;
              try {
                fn(a);
                for (let n = r; n < s; n++) {
                  const r = t.data[n],
                    s = e[n];
                  nn(n),
                    null !== r.hostBindings ||
                    0 !== r.hostVars ||
                    null !== r.hostAttrs
                      ? ns(r, s)
                      : i && o.push(null);
                }
              } finally {
                fn(-1), nn(l);
              }
            })(t, e, n));
      }
      function Wr(t, e, n = Ie) {
        const r = e.localNames;
        if (null !== r) {
          let s = e.index + 1;
          for (let o = 0; o < r.length; o += 2) {
            const i = r[o + 1],
              a = -1 === i ? n(e, t) : t[i];
            t[s++] = a;
          }
        }
      }
      function Zr(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = Qr(
              1,
              -1,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function Qr(t, e, n, r, s, o, i, a, l, c) {
        const u = 20 + r,
          h = u + s,
          d = (function (t, e) {
            const n = [];
            for (let r = 0; r < e; r++) n.push(r < t ? null : Or);
            return n;
          })(u, h);
        return (d[1] = {
          type: t,
          id: e,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          node: null,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          expandoInstructions: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof o ? o() : o,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: l,
          consts: c,
          incompleteFirstPass: !1,
        });
      }
      function Kr(t, e, n, r, s, o) {
        return {
          type: n,
          index: r,
          injectorIndex: e ? e.injectorIndex : -1,
          directiveStart: -1,
          directiveEnd: -1,
          directiveStylingLast: -1,
          propertyBindings: null,
          flags: 0,
          providerIndexes: 0,
          tagName: s,
          attrs: o,
          mergedAttrs: null,
          localNames: null,
          initialInputs: void 0,
          inputs: null,
          outputs: null,
          tViews: null,
          next: null,
          projectionNext: null,
          child: null,
          parent: e,
          projection: null,
          styles: null,
          stylesWithoutHost: null,
          residualStyles: void 0,
          classes: null,
          classesWithoutHost: null,
          residualClasses: void 0,
          classBindings: 0,
          styleBindings: 0,
        };
      }
      function Jr(t, e, n) {
        for (let r in t)
          if (t.hasOwnProperty(r)) {
            const s = t[r];
            (n = null === n ? {} : n).hasOwnProperty(r)
              ? n[r].push(e, s)
              : (n[r] = [e, s]);
          }
        return n;
      }
      function Yr(t, e, n, r, s, o, i, a) {
        const l = Ie(e, n);
        let c,
          u = e.inputs;
        !a && null != u && (c = u[r])
          ? (xs(t, n, c, r, s),
            Se(e) &&
              (function (t, e) {
                const n = Ve(e, t);
                16 & n[2] || (n[2] |= 64);
              })(n, e.index))
          : 3 === e.type &&
            ((r = (function (t) {
              return "class" === t
                ? "className"
                : "for" === t
                ? "htmlFor"
                : "formaction" === t
                ? "formAction"
                : "innerHtml" === t
                ? "innerHTML"
                : "readonly" === t
                ? "readOnly"
                : "tabindex" === t
                ? "tabIndex"
                : t;
            })(r)),
            (s = null != i ? i(s, e.tagName || "", r) : s),
            Te(o)
              ? o.setProperty(l, r, s)
              : On(r) || (l.setProperty ? l.setProperty(r, s) : (l[r] = s)));
      }
      function Xr(t, e, n, r) {
        let s = !1;
        if ($e()) {
          const o = (function (t, e, n) {
              const r = t.directiveRegistry;
              let s = null;
              if (r)
                for (let o = 0; o < r.length; o++) {
                  const i = r[o];
                  Cr(n, i.selectors, !1) &&
                    (s || (s = []),
                    $n(Fn(n, e), t, i.type),
                    ke(i)
                      ? (2 & n.flags && pr(n), ss(t, n), s.unshift(i))
                      : s.push(i));
                }
              return s;
            })(t, e, n),
            i = null === r ? null : { "": -1 };
          if (null !== o) {
            let r = 0;
            (s = !0), is(n, t.data.length, o.length);
            for (let t = 0; t < o.length; t++) {
              const e = o[t];
              e.providersResolver && e.providersResolver(e);
            }
            rs(t, n, o.length);
            let a = !1,
              l = !1;
            for (let s = 0; s < o.length; s++) {
              const c = o[s];
              (n.mergedAttrs = kn(n.mergedAttrs, c.hostAttrs)),
                as(t, e, c),
                os(t.data.length - 1, c, i),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128),
                !a &&
                  (c.onChanges || c.onInit || c.doCheck) &&
                  ((t.preOrderHooks || (t.preOrderHooks = [])).push(
                    n.index - 20
                  ),
                  (a = !0)),
                l ||
                  (!c.onChanges && !c.doCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index - 20
                  ),
                  (l = !0)),
                ts(t, c),
                (r += c.hostVars);
            }
            !(function (t, e) {
              const n = e.directiveEnd,
                r = t.data,
                s = e.attrs,
                o = [];
              let i = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = r[l],
                  n = t.inputs,
                  c = null === s || yr(e) ? null : us(n, s);
                o.push(c), (i = Jr(n, l, i)), (a = Jr(t.outputs, l, a));
              }
              null !== i &&
                (i.hasOwnProperty("class") && (e.flags |= 16),
                i.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = o),
                (e.inputs = i),
                (e.outputs = a);
            })(t, n),
              es(t, e, r);
          }
          i &&
            (function (t, e, n) {
              if (e) {
                const r = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const s = n[e[t + 1]];
                  if (null == s)
                    throw new Error(`Export of name '${e[t + 1]}' not found!`);
                  r.push(e[t], s);
                }
              }
            })(n, r, i);
        }
        return (n.mergedAttrs = kn(n.mergedAttrs, n.attrs)), s;
      }
      function ts(t, e) {
        const n = t.expandoInstructions;
        n.push(e.hostBindings), 0 !== e.hostVars && n.push(e.hostVars);
      }
      function es(t, e, n) {
        for (let r = 0; r < n; r++)
          e.push(Or), t.blueprint.push(Or), t.data.push(null);
      }
      function ns(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function rs(t, e, n) {
        const r = 20 - e.index,
          s = t.data.length - (65535 & e.providerIndexes);
        (t.expandoInstructions || (t.expandoInstructions = [])).push(r, s, n);
      }
      function ss(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function os(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let r = 0; r < e.exportAs.length; r++) n[e.exportAs[r]] = t;
          ke(e) && (n[""] = t);
        }
      }
      function is(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function as(t, e, n) {
        t.data.push(n);
        const r = n.factory || (n.factory = ve(n.type)),
          s = new Cn(r, ke(n), null);
        t.blueprint.push(s), e.push(s);
      }
      function ls(t, e, n) {
        const r = Ie(e, t),
          s = Zr(n),
          o = t[10],
          i = fs(
            t,
            Lr(t, s, null, n.onPush ? 64 : 16, r, e, o, o.createRenderer(r, n))
          );
        t[e.index] = i;
      }
      function cs(t, e, n, r, s, o) {
        const i = o[e];
        if (null !== i) {
          const t = r.setInput;
          for (let e = 0; e < i.length; ) {
            const s = i[e++],
              o = i[e++],
              a = i[e++];
            null !== t ? r.setInput(n, a, s, o) : (n[o] = a);
          }
        }
      }
      function us(t, e) {
        let n = null,
          r = 0;
        for (; r < e.length; ) {
          const s = e[r];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              t.hasOwnProperty(s) &&
                (null === n && (n = []), n.push(s, t[s], e[r + 1])),
                (r += 2);
            } else r += 2;
          else r += 4;
        }
        return n;
      }
      function hs(t, e, n, r) {
        return new Array(t, !0, !1, e, null, 0, r, n, null, null);
      }
      function ds(t, e) {
        const n = Ve(e, t);
        if (Ue(n)) {
          const t = n[1];
          80 & n[2]
            ? $r(t, n, t.template, n[8])
            : n[5] > 0 &&
              (function t(e) {
                for (let r = Er(e); null !== r; r = Pr(r))
                  for (let e = 10; e < r.length; e++) {
                    const n = r[e];
                    if (1024 & n[2]) {
                      const t = n[1];
                      $r(t, n, t.template, n[8]);
                    } else n[5] > 0 && t(n);
                  }
                const n = e[1].components;
                if (null !== n)
                  for (let r = 0; r < n.length; r++) {
                    const s = Ve(n[r], e);
                    Ue(s) && s[5] > 0 && t(s);
                  }
              })(n);
        }
      }
      function ps(t, e) {
        const n = Ve(e, t),
          r = n[1];
        !(function (t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(r, n),
          zr(r, n, n[8]);
      }
      function fs(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function gs(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = kr(t);
          if (Ee(t) && !e) return t;
          t = e;
        }
        return null;
      }
      function ms(t, e, n) {
        const r = e[10];
        r.begin && r.begin();
        try {
          $r(t, e, t.template, n);
        } catch (s) {
          throw (Cs(e, s), s);
        } finally {
          r.end && r.end();
        }
      }
      function ys(t) {
        !(function (t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              r = je(n),
              s = r[1];
            qr(s, r, s.template, n);
          }
        })(t[8]);
      }
      function _s(t, e, n) {
        sn(0), e(t, n);
      }
      const vs = (() => Promise.resolve(null))();
      function bs(t) {
        return t[7] || (t[7] = []);
      }
      function ws(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function Cs(t, e) {
        const n = t[9],
          r = n ? n.get(nr, null) : null;
        r && r.handleError(e);
      }
      function xs(t, e, n, r, s) {
        for (let o = 0; o < n.length; ) {
          const i = n[o++],
            a = n[o++],
            l = e[i],
            c = t.data[i];
          null !== c.setInput ? c.setInput(l, s, r, a) : (l[a] = s);
        }
      }
      function Ss(t, e) {
        const n = e[3];
        return -1 === t.index ? (Ce(n) ? n : null) : n;
      }
      function Os(t, e) {
        const n = Ss(t, e);
        return n ? Ds(e[11], n[7]) : null;
      }
      function ks(t, e, n, r, s) {
        if (null != r) {
          let o,
            i = !1;
          Ce(r) ? (o = r) : we(r) && ((i = !0), (r = r[0]));
          const a = Me(r);
          0 === t && null !== n
            ? null == s
              ? Vs(e, n, a)
              : Ns(e, n, a, s || null)
            : 1 === t && null !== n
            ? Ns(e, n, a, s || null)
            : 2 === t
            ? (function (t, e, n) {
                const r = Ds(t, e);
                r &&
                  (function (t, e, n, r) {
                    Te(t) ? t.removeChild(e, n, r) : e.removeChild(n);
                  })(t, r, e, n);
              })(e, a, i)
            : 3 === t && e.destroyNode(a),
            null != o &&
              (function (t, e, n, r, s) {
                const o = n[7];
                o !== Me(n) && ks(e, t, r, o, s);
                for (let i = 10; i < n.length; i++) {
                  const s = n[i];
                  zs(s[1], s, t, e, r, o);
                }
              })(e, t, o, n, s);
        }
      }
      function Es(t, e, n, r) {
        const s = Os(t.node, e);
        s && zs(t, e, e[11], n ? 1 : 2, s, r);
      }
      function Ps(t, e) {
        const n = t[9],
          r = n.indexOf(e);
        1024 & e[2] && He(e[3], -1), n.splice(r, 1);
      }
      function Ts(t, e) {
        if (t.length <= 10) return;
        const n = 10 + e,
          r = t[n];
        if (r) {
          const s = r[17];
          null !== s && s !== t && Ps(s, r), e > 0 && (t[n - 1][4] = r[4]);
          const o = ee(t, 10 + e);
          Es(r[1], r, !1, null);
          const i = o[19];
          null !== i && i.detachView(o[1]),
            (r[3] = null),
            (r[4] = null),
            (r[2] &= -129);
        }
        return r;
      }
      function As(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          Te(n) && n.destroyNode && zs(t, e, n, 3, null, null),
            (function (t) {
              let e = t[13];
              if (!e) return Rs(t[1], t);
              for (; e; ) {
                let n = null;
                if (we(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    we(e) && Rs(e[1], e), (e = Ms(e, t));
                  null === e && (e = t), we(e) && Rs(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function Ms(t, e) {
        let n;
        return we(t) && (n = t[6]) && 2 === n.type
          ? Ss(n, t)
          : t[3] === e
          ? null
          : t[3];
      }
      function Rs(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function (t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const t = e[n[r]];
                  if (!(t instanceof Cn)) {
                    const e = n[r + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function (t, e) {
              const n = t.cleanup;
              if (null !== n) {
                const t = e[7];
                for (let r = 0; r < n.length - 1; r += 2)
                  if ("string" == typeof n[r]) {
                    const s = n[r + 1],
                      o = "function" == typeof s ? s(e) : Me(e[s]),
                      i = t[n[r + 2]],
                      a = n[r + 3];
                    "boolean" == typeof a
                      ? o.removeEventListener(n[r], i, a)
                      : a >= 0
                      ? t[a]()
                      : t[-a].unsubscribe(),
                      (r += 2);
                  } else n[r].call(t[n[r + 1]]);
                e[7] = null;
              }
            })(t, e);
          const n = e[6];
          n && 3 === n.type && Te(e[11]) && e[11].destroy();
          const r = e[17];
          if (null !== r && Ce(e[3])) {
            r !== e[3] && Ps(r, e);
            const n = e[19];
            null !== n && n.detachView(t);
          }
        }
      }
      function Is(t, e, n) {
        let r = e.parent;
        for (; null != r && (4 === r.type || 5 === r.type); )
          r = (e = r).parent;
        if (null == r) {
          const t = n[6];
          return 2 === t.type ? Os(t, n) : n[0];
        }
        if (e && 5 === e.type && 4 & e.flags) return Ie(e, n).parentNode;
        if (2 & r.flags) {
          const e = t.data,
            n = e[e[r.index].directiveStart].encapsulation;
          if (n !== ae.ShadowDom && n !== ae.Native) return null;
        }
        return Ie(r, n);
      }
      function Ns(t, e, n, r) {
        Te(t) ? t.insertBefore(e, n, r) : e.insertBefore(n, r, !0);
      }
      function Vs(t, e, n) {
        Te(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function js(t, e, n, r) {
        null !== r ? Ns(t, e, n, r) : Vs(t, e, n);
      }
      function Ds(t, e) {
        return Te(t) ? t.parentNode(e) : e.parentNode;
      }
      function Us(t, e) {
        if (2 === t.type) {
          const n = Ss(t, e);
          return null === n ? null : Ls(n.indexOf(e, 10) - 10, n);
        }
        return 4 === t.type || 5 === t.type ? Ie(t, e) : null;
      }
      function Fs(t, e, n, r) {
        const s = Is(t, r, e);
        if (null != s) {
          const t = e[11],
            o = Us(r.parent || e[6], e);
          if (Array.isArray(n))
            for (let e = 0; e < n.length; e++) js(t, s, n[e], o);
          else js(t, s, n, o);
        }
      }
      function Ls(t, e) {
        const n = 10 + t + 1;
        if (n < e.length) {
          const t = e[n],
            r = t[1].firstChild;
          if (null !== r)
            return (function t(e, n) {
              if (null !== n) {
                const r = n.type;
                if (3 === r) return Ie(n, e);
                if (0 === r) return Ls(-1, e[n.index]);
                if (4 === r || 5 === r) {
                  const r = n.child;
                  if (null !== r) return t(e, r);
                  {
                    const t = e[n.index];
                    return Ce(t) ? Ls(-1, t) : Me(t);
                  }
                }
                {
                  const r = e[16],
                    s = r[6],
                    o = kr(r),
                    i = s.projection[n.projection];
                  return null != i ? t(o, i) : t(e, n.next);
                }
              }
              return null;
            })(t, r);
        }
        return e[7];
      }
      function Hs(t, e, n, r, s, o, i) {
        for (; null != n; ) {
          const a = r[n.index],
            l = n.type;
          i && 0 === e && (a && dr(Me(a), r), (n.flags |= 4)),
            64 != (64 & n.flags) &&
              (4 === l || 5 === l
                ? (Hs(t, e, n.child, r, s, o, !1), ks(e, t, s, a, o))
                : 1 === l
                ? $s(t, e, r, n, s, o)
                : ks(e, t, s, a, o)),
            (n = i ? n.projectionNext : n.next);
        }
      }
      function zs(t, e, n, r, s, o) {
        Hs(n, r, t.node.child, e, s, o, !1);
      }
      function $s(t, e, n, r, s, o) {
        const i = n[16],
          a = i[6].projection[r.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) ks(e, t, s, a[l], o);
        else Hs(t, e, a, i[3], s, o, !0);
      }
      function qs(t, e, n) {
        Te(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Bs(t, e, n) {
        Te(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      class Gs {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._viewContainerRef = null);
        }
        get rootNodes() {
          const t = this._lView;
          return null == t[0]
            ? (function t(e, n, r, s, o = !1) {
                for (; null !== r; ) {
                  const i = n[r.index];
                  if ((null !== i && s.push(Me(i)), Ce(i)))
                    for (let e = 10; e < i.length; e++) {
                      const n = i[e],
                        r = n[1].firstChild;
                      null !== r && t(n[1], n, r, s);
                    }
                  const a = r.type;
                  if (4 === a || 5 === a) t(e, n, r.child, s);
                  else if (1 === a) {
                    const e = n[16],
                      o = e[6].projection[r.projection];
                    if (Array.isArray(o)) s.push(...o);
                    else {
                      const n = kr(e);
                      t(n[1], n, o, s, !0);
                    }
                  }
                  r = o ? r.projectionNext : r.next;
                }
                return s;
              })(t[1], t, t[6].child, [])
            : [];
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._viewContainerRef) {
            const t = this._viewContainerRef.indexOf(this);
            t > -1 && this._viewContainerRef.detach(t),
              (this._viewContainerRef = null);
          }
          As(this._lView[1], this._lView);
        }
        onDestroy(t) {
          var e, n, r;
          (e = this._lView[1]),
            (r = t),
            bs((n = this._lView)).push(r),
            e.firstCreatePass && ws(e).push(n[7].length - 1, null);
        }
        markForCheck() {
          gs(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          ms(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function (t, e, n) {
            Ye(!0);
            try {
              ms(t, e, n);
            } finally {
              Ye(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef(t) {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._viewContainerRef = t;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            zs(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._viewContainerRef)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class Ws extends Gs {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          ys(this._view);
        }
        checkNoChanges() {
          !(function (t) {
            Ye(!0);
            try {
              ys(t);
            } finally {
              Ye(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      let Zs, Qs, Ks;
      function Js(t, e, n) {
        return Zs || (Zs = class extends t {}), new Zs(Ie(e, n));
      }
      function Ys(t, e, n, r) {
        return (
          Qs ||
            (Qs = class extends t {
              constructor(t, e, n) {
                super(),
                  (this._declarationView = t),
                  (this._declarationTContainer = e),
                  (this.elementRef = n);
              }
              createEmbeddedView(t) {
                const e = this._declarationTContainer.tViews,
                  n = Lr(this._declarationView, e, t, 16, null, e.node);
                n[17] =
                  this._declarationView[this._declarationTContainer.index];
                const r = this._declarationView[19];
                return (
                  null !== r && (n[19] = r.createEmbeddedView(e)),
                  zr(e, n, t),
                  new Gs(n)
                );
              }
            }),
          0 === n.type ? new Qs(r, n, Js(e, n, r)) : null
        );
      }
      function Xs(t, e, n, r) {
        let s;
        Ks ||
          (Ks = class extends t {
            constructor(t, e, n) {
              super(),
                (this._lContainer = t),
                (this._hostTNode = e),
                (this._hostView = n);
            }
            get element() {
              return Js(e, this._hostTNode, this._hostView);
            }
            get injector() {
              return new Jn(this._hostTNode, this._hostView);
            }
            get parentInjector() {
              const t = zn(this._hostTNode, this._hostView),
                e = Mn(t, this._hostView),
                n = (function (t, e, n) {
                  if (n.parent && -1 !== n.parent.injectorIndex) {
                    const t = n.parent.injectorIndex;
                    let e = n.parent;
                    for (; null != e.parent && t == e.parent.injectorIndex; )
                      e = e.parent;
                    return e;
                  }
                  let r = An(t),
                    s = e,
                    o = e[6];
                  for (; r > 1; ) (s = s[15]), (o = s[6]), r--;
                  return o;
                })(t, this._hostView, this._hostTNode);
              return Pn(t) && null != n
                ? new Jn(n, e)
                : new Jn(null, this._hostView);
            }
            clear() {
              for (; this.length > 0; ) this.remove(this.length - 1);
            }
            get(t) {
              return (
                (null !== this._lContainer[8] && this._lContainer[8][t]) || null
              );
            }
            get length() {
              return this._lContainer.length - 10;
            }
            createEmbeddedView(t, e, n) {
              const r = t.createEmbeddedView(e || {});
              return this.insert(r, n), r;
            }
            createComponent(t, e, n, r, s) {
              const o = n || this.parentInjector;
              if (!s && null == t.ngModule && o) {
                const t = o.get(Jt, null);
                t && (s = t);
              }
              const i = t.create(o, r, void 0, s);
              return this.insert(i.hostView, e), i;
            }
            insert(t, e) {
              const n = t._lView,
                r = n[1];
              if (t.destroyed)
                throw new Error(
                  "Cannot insert a destroyed View in a ViewContainer!"
                );
              if ((this.allocateContainerIfNeeded(), Ce(n[3]))) {
                const e = this.indexOf(t);
                if (-1 !== e) this.detach(e);
                else {
                  const e = n[3],
                    r = new Ks(e, e[6], e[3]);
                  r.detach(r.indexOf(t));
                }
              }
              const s = this._adjustIndex(e);
              return (
                (function (t, e, n, r) {
                  const s = 10 + r,
                    o = n.length;
                  r > 0 && (n[s - 1][4] = e),
                    r < o - 10
                      ? ((e[4] = n[s]), te(n, 10 + r, e))
                      : (n.push(e), (e[4] = null)),
                    (e[3] = n);
                  const i = e[17];
                  null !== i &&
                    n !== i &&
                    (function (t, e) {
                      const n = t[9];
                      e[16] !== e[3][3][16] && (t[2] = !0),
                        null === n ? (t[9] = [e]) : n.push(e);
                    })(i, e);
                  const a = e[19];
                  null !== a && a.insertView(t), (e[2] |= 128);
                })(r, n, this._lContainer, s),
                Es(r, n, !0, Ls(s, this._lContainer)),
                t.attachToViewContainerRef(this),
                te(this._lContainer[8], s, t),
                t
              );
            }
            move(t, e) {
              if (t.destroyed)
                throw new Error(
                  "Cannot move a destroyed View in a ViewContainer!"
                );
              return this.insert(t, e);
            }
            indexOf(t) {
              const e = this._lContainer[8];
              return null !== e ? e.indexOf(t) : -1;
            }
            remove(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1);
              !(function (t, e) {
                const n = Ts(t, e);
                n && As(n[1], n);
              })(this._lContainer, e),
                ee(this._lContainer[8], e);
            }
            detach(t) {
              this.allocateContainerIfNeeded();
              const e = this._adjustIndex(t, -1),
                n = Ts(this._lContainer, e);
              return n && null != ee(this._lContainer[8], e) ? new Gs(n) : null;
            }
            _adjustIndex(t, e = 0) {
              return null == t ? this.length + e : t;
            }
            allocateContainerIfNeeded() {
              null === this._lContainer[8] && (this._lContainer[8] = []);
            }
          });
        const o = r[n.index];
        if (Ce(o)) s = o;
        else {
          let t;
          if (4 === n.type) t = Me(o);
          else if (((t = r[11].createComment("")), Ee(r))) {
            const e = r[11],
              s = Ie(n, r);
            Ns(
              e,
              Ds(e, s),
              t,
              (function (t, e) {
                return Te(t) ? t.nextSibling(e) : e.nextSibling;
              })(e, s)
            );
          } else Fs(r[1], r, t, n);
          (r[n.index] = s = hs(o, r, t, n)), fs(r, s);
        }
        return new Ks(s, n, r);
      }
      let to = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => eo()), t;
      })();
      const eo = function (t = !1) {
          return (function (t, e, n) {
            if (!n && Se(t)) {
              const n = Ve(t.index, e);
              return new Gs(n, n);
            }
            return 3 === t.type || 0 === t.type || 4 === t.type || 5 === t.type
              ? new Gs(e[16], e)
              : null;
          })(We(), qe(), t);
        },
        no = new Dt("Set Injector scope."),
        ro = {},
        so = {},
        oo = [];
      let io = void 0;
      function ao() {
        return void 0 === io && (io = new Kt()), io;
      }
      function lo(t, e = null, n = null, r) {
        return new co(t, n, e || ao(), r);
      }
      class co {
        constructor(t, e, n, r = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const s = [];
          e && Xt(e, (n) => this.processProvider(n, t, e)),
            Xt([t], (t) => this.processInjectorType(t, [], s)),
            this.records.set(Ut, po(void 0, this));
          const o = this.records.get(no);
          (this.scope = null != o ? o.value : null),
            (this.source = r || ("object" == typeof t ? null : vt(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach((t) => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Ft, n = it.Default) {
          this.assertNotDestroyed();
          const r = qt(this);
          try {
            if (!(n & it.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (s = t) ||
                    ("object" == typeof s && s instanceof Dt)) &&
                  ht(t);
                (e = n && this.injectableDefInScope(n) ? po(uo(t), ro) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & it.Self ? ao() : this.parent).get(
              t,
              (e = n & it.Optional && e === Ft ? null : e)
            );
          } catch (o) {
            if ("NullInjectorError" === o.name) {
              if (
                ((o.ngTempTokenPath = o.ngTempTokenPath || []).unshift(vt(t)),
                r)
              )
                throw o;
              return (function (t, e, n, r) {
                const s = t.ngTempTokenPath;
                throw (
                  (e.__source && s.unshift(e.__source),
                  (t.message = (function (t, e, n, r = null) {
                    t =
                      t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                        ? t.substr(2)
                        : t;
                    let s = vt(e);
                    if (Array.isArray(e)) s = e.map(vt).join(" -> ");
                    else if ("object" == typeof e) {
                      let t = [];
                      for (let n in e)
                        if (e.hasOwnProperty(n)) {
                          let r = e[n];
                          t.push(
                            n +
                              ":" +
                              ("string" == typeof r ? JSON.stringify(r) : vt(r))
                          );
                        }
                      s = `{${t.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${s}]: ${t.replace(
                      Lt,
                      "\n  "
                    )}`;
                  })("\n" + t.message, s, n, r)),
                  (t.ngTokenPath = s),
                  (t.ngTempTokenPath = null),
                  t)
                );
              })(o, t, "R3InjectorError", this.source);
            }
            throw o;
          } finally {
            qt(r);
          }
          var s;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach((t) => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(vt(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = xt(t))) return !1;
          let r = pt(t);
          const s = (null == r && t.ngModule) || void 0,
            o = void 0 === s ? t : s,
            i = -1 !== n.indexOf(o);
          if ((void 0 !== s && (r = pt(s)), null == r)) return !1;
          if (null != r.imports && !i) {
            let t;
            n.push(o);
            try {
              Xt(r.imports, (r) => {
                this.processInjectorType(r, e, n) &&
                  (void 0 === t && (t = []), t.push(r));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: r } = t[e];
                Xt(r, (t) => this.processProvider(t, n, r || oo));
              }
          }
          this.injectorDefTypes.add(o), this.records.set(o, po(r.factory, ro));
          const a = r.providers;
          if (null != a && !i) {
            const e = t;
            Xt(a, (t) => this.processProvider(t, e, a));
          }
          return void 0 !== s && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let r = go((t = xt(t))) ? t : xt(t && t.provide);
          const s = (function (t, e, n) {
            return fo(t) ? po(void 0, t.useValue) : po(ho(t, e, n), ro);
          })(t, e, n);
          if (go(t) || !0 !== t.multi) {
            const t = this.records.get(r);
            t && void 0 !== t.multi && fr();
          } else {
            let e = this.records.get(r);
            e
              ? void 0 === e.multi && fr()
              : ((e = po(void 0, ro, !0)),
                (e.factory = () => Qt(e.multi)),
                this.records.set(r, e)),
              (r = t),
              e.multi.push(t);
          }
          this.records.set(r, s);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === so
              ? (function (t) {
                  throw new Error("Cannot instantiate cyclic dependency! " + t);
                })(vt(t))
              : e.value === ro && ((e.value = so), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function uo(t) {
        const e = ht(t),
          n = null !== e ? e.factory : ve(t);
        if (null !== n) return n;
        const r = pt(t);
        if (null !== r) return r.factory;
        if (t instanceof Dt)
          throw new Error(`Token ${vt(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function (t) {
            const e = t.length;
            if (e > 0) {
              const n = ne(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${vt(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function (t) {
              const e = t && (t[ft] || t[yt] || (t[mt] && t[mt]()));
              if (e) {
                const n = (function (t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in v10. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function ho(t, e, n) {
        let r = void 0;
        if (go(t)) {
          const e = xt(t);
          return ve(e) || uo(e);
        }
        if (fo(t)) r = () => xt(t.useValue);
        else if ((s = t) && s.useFactory)
          r = () => t.useFactory(...Qt(t.deps || []));
        else if (
          (function (t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          r = () => Wt(xt(t.useExisting));
        else {
          const s = xt(t && (t.useClass || t.provide));
          if (
            (s ||
              (function (t, e, n) {
                let r = "";
                throw (
                  (t &&
                    e &&
                    (r = ` - only instances of Provider and Type are allowed, got: [${e
                      .map((t) => (t == n ? "?" + n + "?" : "..."))
                      .join(", ")}]`),
                  new Error(`Invalid provider for the NgModule '${vt(t)}'` + r))
                );
              })(e, n, t),
            !(function (t) {
              return !!t.deps;
            })(t))
          )
            return ve(s) || uo(s);
          r = () => new s(...Qt(t.deps));
        }
        var s;
        return r;
      }
      function po(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function fo(t) {
        return null !== t && "object" == typeof t && Ht in t;
      }
      function go(t) {
        return "function" == typeof t;
      }
      const mo = function (t, e, n) {
        return (function (t, e = null, n = null, r) {
          const s = lo(t, e, n, r);
          return s._resolveInjectorDefTypes(), s;
        })({ name: n }, e, t, n);
      };
      let yo = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? mo(t, e, "")
              : mo(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Ft),
          (t.NULL = new Kt()),
          (t.ɵprov = ct({
            token: t,
            providedIn: "any",
            factory: () => Wt(Ut),
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      const _o = new Dt("AnalyzeForEntryComponents");
      let vo = new Map();
      const bo = new Set();
      function wo(t) {
        return "string" == typeof t ? t : t.text();
      }
      function Co(t, e, n) {
        let r = n ? t.styles : null,
          s = n ? t.classes : null,
          o = 0;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const t = e[i];
            "number" == typeof t
              ? (o = t)
              : 1 == o
              ? (s = bt(s, t))
              : 2 == o && (r = bt(r, t + ": " + e[++i] + ";"));
          }
        n ? (t.styles = r) : (t.stylesWithoutHost = r),
          n ? (t.classes = s) : (t.classesWithoutHost = s);
      }
      let xo = null;
      function So() {
        if (!xo) {
          const t = Tt.Symbol;
          if (t && t.iterator) xo = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (xo = n);
            }
          }
        }
        return xo;
      }
      function Oo(t, e) {
        return (
          t === e ||
          ("number" == typeof t && "number" == typeof e && isNaN(t) && isNaN(e))
        );
      }
      function ko(t) {
        return (
          !!Eo(t) && (Array.isArray(t) || (!(t instanceof Map) && So() in t))
        );
      }
      function Eo(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function Po(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function To(t, e, n, r) {
        const s = qe();
        return (
          Po(s, Xe(), e) &&
            (Be(),
            (function (t, e, n, r, s, o) {
              const i = Ie(t, e),
                a = e[11];
              if (null == r)
                Te(a) ? a.removeAttribute(i, n, o) : i.removeAttribute(n);
              else {
                const e = null == s ? Rn(r) : s(r, t.tagName || "", n);
                Te(a)
                  ? a.setAttribute(i, n, e, o)
                  : o
                  ? i.setAttributeNS(o, n, e)
                  : i.setAttribute(n, e);
              }
            })(gn(), s, t, e, n, r)),
          To
        );
      }
      function Ao(t, e, n, r) {
        return Po(t, Xe(), n) ? e + Rn(n) + r : Or;
      }
      function Mo(t, e, n, r, s, o, i, a) {
        const l = qe(),
          c = Be(),
          u = t + 20,
          h = c.firstCreatePass
            ? (function (t, e, n, r, s, o, i, a, l) {
                const c = e.consts,
                  u = Hr(e, n[6], t, 0, i || null, Fe(c, a));
                Xr(e, n, u, Fe(c, l)), mn(e, u);
                const h = (u.tViews = Qr(
                    2,
                    -1,
                    r,
                    s,
                    o,
                    e.directiveRegistry,
                    e.pipeRegistry,
                    null,
                    e.schemas,
                    c
                  )),
                  d = Kr(0, null, 2, -1, null, null);
                return (
                  (d.injectorIndex = u.injectorIndex),
                  (h.node = d),
                  null !== e.queries &&
                    (e.queries.template(e, u),
                    (h.queries = e.queries.embeddedTView(u))),
                  u
                );
              })(t, c, l, e, n, r, s, o, i)
            : c.data[u];
        Ze(h, !1);
        const d = l[11].createComment("");
        Fs(c, l, d, h),
          dr(d, l),
          fs(l, (l[u] = hs(d, l, d, h))),
          Oe(h) && Gr(c, l, h),
          null != i && Wr(l, h, a);
      }
      function Ro(t) {
        return (function (t, e) {
          return t[e + 20];
        })(ze.lFrame.contextLView, t);
      }
      function Io(t, e = it.Default) {
        const n = qe();
        return null == n ? Wt(t, e) : qn(We(), n, xt(t), e);
      }
      function No(t) {
        return (function (t, e) {
          if ("class" === e) return t.classes;
          if ("style" === e) return t.styles;
          const n = t.attrs;
          if (n) {
            const t = n.length;
            let r = 0;
            for (; r < t; ) {
              const s = n[r];
              if (Sn(s)) break;
              if (0 === s) r += 2;
              else if ("number" == typeof s)
                for (r++; r < t && "string" == typeof n[r]; ) r++;
              else {
                if (s === e) return n[r + 1];
                r += 2;
              }
            }
          }
          return null;
        })(We(), t);
      }
      function Vo() {
        throw new Error("invalid");
      }
      function jo(t, e, n) {
        const r = qe();
        return Po(r, Xe(), e) && Yr(Be(), gn(), r, t, e, r[11], n, !1), jo;
      }
      function Do(t, e, n, r, s) {
        const o = s ? "class" : "style";
        xs(t, n, e.inputs[o], o, r);
      }
      function Uo(t, e, n, r) {
        const s = qe(),
          o = Be(),
          i = 20 + t,
          a = s[11],
          l = (s[i] = Fr(e, a, ze.lFrame.currentNamespace)),
          c = o.firstCreatePass
            ? (function (t, e, n, r, s, o, i) {
                const a = e.consts,
                  l = Fe(a, o),
                  c = Hr(e, n[6], t, 3, s, l);
                return (
                  Xr(e, n, c, Fe(a, i)),
                  null !== c.attrs && Co(c, c.attrs, !1),
                  null !== c.mergedAttrs && Co(c, c.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, c),
                  c
                );
              })(t, o, s, 0, e, n, r)
            : o.data[i];
        Ze(c, !0);
        const u = c.mergedAttrs;
        null !== u && xn(a, l, u);
        const h = c.classes;
        null !== h && Bs(a, l, h);
        const d = c.styles;
        null !== d && qs(a, l, d),
          Fs(o, s, l, c),
          0 === ze.lFrame.elementDepthCount && dr(l, s),
          ze.lFrame.elementDepthCount++,
          Oe(c) &&
            (Gr(o, s, c),
            (function (t, e, n) {
              if (xe(e)) {
                const r = e.directiveEnd;
                for (let s = e.directiveStart; s < r; s++) {
                  const e = t.data[s];
                  e.contentQueries && e.contentQueries(1, n[s], s);
                }
              }
            })(o, c, s)),
          null !== r && Wr(s, c);
      }
      function Fo() {
        let t = We();
        Qe() ? Ke() : ((t = t.parent), Ze(t, !1));
        const e = t;
        ze.lFrame.elementDepthCount--;
        const n = Be();
        n.firstCreatePass && (mn(n, t), xe(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function (t) {
              return 0 != (16 & t.flags);
            })(e) &&
            Do(n, e, qe(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function (t) {
              return 0 != (32 & t.flags);
            })(e) &&
            Do(n, e, qe(), e.stylesWithoutHost, !1);
      }
      function Lo(t, e, n, r) {
        Uo(t, e, n, r), Fo();
      }
      function Ho() {
        return qe();
      }
      function zo(t) {
        return !!t && "function" == typeof t.then;
      }
      function $o(t) {
        return !!t && "function" == typeof t.subscribe;
      }
      function qo(t, e, n = !1, r) {
        const s = qe(),
          o = Be(),
          i = We();
        return (
          (function (t, e, n, r, s, o, i = !1, a) {
            const l = Oe(r),
              c = t.firstCreatePass && (t.cleanup || (t.cleanup = [])),
              u = bs(e);
            let h = !0;
            if (3 === r.type) {
              const d = Ie(r, e),
                p = a ? a(d) : le,
                f = p.target || d,
                g = u.length,
                m = a ? (t) => a(Me(t[r.index])).target : r.index;
              if (Te(n)) {
                let i = null;
                if (
                  (!a &&
                    l &&
                    (i = (function (t, e, n, r) {
                      const s = t.cleanup;
                      if (null != s)
                        for (let o = 0; o < s.length - 1; o += 2) {
                          const t = s[o];
                          if (t === n && s[o + 1] === r) {
                            const t = e[7],
                              n = s[o + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (o += 2);
                        }
                      return null;
                    })(t, e, s, r.index)),
                  null !== i)
                )
                  ((i.__ngLastListenerFn__ || i).__ngNextListenerFn__ = o),
                    (i.__ngLastListenerFn__ = o),
                    (h = !1);
                else {
                  o = Go(r, e, o, !1);
                  const t = n.listen(p.name || f, s, o);
                  u.push(o, t), c && c.push(s, m, g, g + 1);
                }
              } else
                (o = Go(r, e, o, !0)),
                  f.addEventListener(s, o, i),
                  u.push(o),
                  c && c.push(s, m, g, i);
            }
            const d = r.outputs;
            let p;
            if (h && null !== d && (p = d[s])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(o),
                    i = u.length;
                  u.push(o, t), c && c.push(s, r.index, i, -(i + 1));
                }
            }
          })(o, s, s[11], i, t, e, n, r),
          qo
        );
      }
      function Bo(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (r) {
          return Cs(t, r), !1;
        }
      }
      function Go(t, e, n, r) {
        return function s(o) {
          if (o === Function) return n;
          const i = 2 & t.flags ? Ve(t.index, e) : e;
          0 == (32 & e[2]) && gs(i);
          let a = Bo(e, n, o),
            l = s.__ngNextListenerFn__;
          for (; l; ) (a = Bo(e, l, o) && a), (l = l.__ngNextListenerFn__);
          return r && !1 === a && (o.preventDefault(), (o.returnValue = !1)), a;
        };
      }
      function Wo(t = 1) {
        return (function (t) {
          return (ze.lFrame.contextLView = (function (t, e) {
            for (; t > 0; ) (e = e[15]), t--;
            return e;
          })(t, ze.lFrame.contextLView))[8];
        })(t);
      }
      function Zo(t, e, n, r, s) {
        const o = qe(),
          i = Ao(o, e, n, r);
        return i !== Or && Yr(Be(), gn(), o, t, i, o[11], s, !1), Zo;
      }
      const Qo = [];
      function Ko(t, e, n, r, s) {
        const o = t[n + 1],
          i = null === e;
        let a = r ? Ir(o) : Vr(o),
          l = !1;
        for (; 0 !== a && (!1 === l || i); ) {
          const n = t[a + 1];
          Jo(t[a], e) && ((l = !0), (t[a + 1] = r ? Dr(n) : Nr(n))),
            (a = r ? Ir(n) : Vr(n));
        }
        l && (t[n + 1] = r ? Nr(o) : Dr(o));
      }
      function Jo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && oe(t, e) >= 0)
        );
      }
      const Yo = { textEnd: 0, key: 0, keyEnd: 0, value: 0, valueEnd: 0 };
      function Xo(t) {
        return t.substring(Yo.key, Yo.keyEnd);
      }
      function ti(t, e) {
        const n = Yo.textEnd;
        return n === e
          ? -1
          : ((e = Yo.keyEnd =
              (function (t, e, n) {
                for (; e < n && t.charCodeAt(e) > 32; ) e++;
                return e;
              })(t, (Yo.key = e), n)),
            ei(t, e, n));
      }
      function ei(t, e, n) {
        for (; e < n && t.charCodeAt(e) <= 32; ) e++;
        return e;
      }
      function ni(t, e, n) {
        return ii(t, e, n, !1), ni;
      }
      function ri(t, e) {
        return ii(t, e, null, !0), ri;
      }
      function si(t) {
        !(function (t, e, n, r) {
          const s = Be(),
            o = tn(2);
          s.firstUpdatePass && li(s, null, o, !0);
          const i = qe();
          if (n !== Or && Po(i, o, n)) {
            const r = s.data[pn() + 20];
            if (fi(r, !0) && !ai(s, o)) {
              let t = r.classesWithoutHost;
              null !== t && (n = bt(t, n || "")), Do(s, r, i, n, !0);
            } else
              !(function (t, e, n, r, s, o, i, a) {
                s === Or && (s = Qo);
                let l = 0,
                  c = 0,
                  u = 0 < s.length ? s[0] : null,
                  h = 0 < o.length ? o[0] : null;
                for (; null !== u || null !== h; ) {
                  const i = l < s.length ? s[l + 1] : void 0,
                    d = c < o.length ? o[c + 1] : void 0;
                  let p = null,
                    f = void 0;
                  u === h
                    ? ((l += 2), (c += 2), i !== d && ((p = h), (f = d)))
                    : null === h || (null !== u && u < h)
                    ? ((l += 2), (p = u))
                    : ((c += 2), (p = h), (f = d)),
                    null !== p && hi(t, e, n, r, p, f, !0, a),
                    (u = l < s.length ? s[l] : null),
                    (h = c < o.length ? o[c] : null);
                }
              })(
                s,
                r,
                i,
                i[11],
                i[o + 1],
                (i[o + 1] = (function (t, e, n) {
                  if (null == n || "" === n) return Qo;
                  const r = [],
                    s = sr(n);
                  if (Array.isArray(s))
                    for (let o = 0; o < s.length; o++) t(r, s[o], !0);
                  else if ("object" == typeof s)
                    for (const o in s) s.hasOwnProperty(o) && t(r, o, s[o]);
                  else "string" == typeof s && e(r, s);
                  return r;
                })(t, e, n)),
                0,
                o
              );
          }
        })(re, oi, t);
      }
      function oi(t, e) {
        for (
          let n = (function (t) {
            return (
              (function (t) {
                (Yo.key = 0),
                  (Yo.keyEnd = 0),
                  (Yo.value = 0),
                  (Yo.valueEnd = 0),
                  (Yo.textEnd = t.length);
              })(t),
              ti(t, ei(t, 0, Yo.textEnd))
            );
          })(e);
          n >= 0;
          n = ti(e, n)
        )
          re(t, Xo(e), !0);
      }
      function ii(t, e, n, r) {
        const s = qe(),
          o = Be(),
          i = tn(2);
        if ((o.firstUpdatePass && li(o, t, i, r), e !== Or && Po(s, i, e))) {
          let a;
          null == n &&
            (a = (function () {
              const t = ze.lFrame;
              return null === t ? null : t.currentSanitizer;
            })()) &&
            (n = a),
            hi(
              o,
              o.data[pn() + 20],
              s,
              s[11],
              t,
              (s[i + 1] = (function (t, e) {
                return (
                  null == t ||
                    ("function" == typeof e
                      ? (t = e(t))
                      : "string" == typeof e
                      ? (t += e)
                      : "object" == typeof t && (t = vt(sr(t)))),
                  t
                );
              })(e, n)),
              r,
              i
            );
        }
      }
      function ai(t, e) {
        return e >= t.expandoStartIndex;
      }
      function li(t, e, n, r) {
        const s = t.data;
        if (null === s[n + 1]) {
          const o = s[pn() + 20],
            i = ai(t, n);
          fi(o, r) && null === e && !i && (e = !1),
            (e = (function (t, e, n, r) {
              const s = (function (t) {
                const e = ze.lFrame.currentDirectiveIndex;
                return -1 === e ? null : t[e];
              })(t);
              let o = r ? e.residualClasses : e.residualStyles;
              if (null === s)
                0 === (r ? e.classBindings : e.styleBindings) &&
                  ((n = ui((n = ci(null, t, e, n, r)), e.attrs, r)),
                  (o = null));
              else {
                const i = e.directiveStylingLast;
                if (-1 === i || t[i] !== s)
                  if (((n = ci(s, t, e, n, r)), null === o)) {
                    let n = (function (t, e, n) {
                      const r = n ? e.classBindings : e.styleBindings;
                      if (0 !== Vr(r)) return t[Ir(r)];
                    })(t, e, r);
                    void 0 !== n &&
                      Array.isArray(n) &&
                      ((n = ci(null, t, e, n[1], r)),
                      (n = ui(n, e.attrs, r)),
                      (function (t, e, n, r) {
                        t[Ir(n ? e.classBindings : e.styleBindings)] = r;
                      })(t, e, r, n));
                  } else
                    o = (function (t, e, n) {
                      let r = void 0;
                      const s = e.directiveEnd;
                      for (let o = 1 + e.directiveStylingLast; o < s; o++)
                        r = ui(r, t[o].hostAttrs, n);
                      return ui(r, e.attrs, n);
                    })(t, e, r);
              }
              return (
                void 0 !== o &&
                  (r ? (e.residualClasses = o) : (e.residualStyles = o)),
                n
              );
            })(s, o, e, r)),
            (function (t, e, n, r, s, o) {
              let i = o ? e.classBindings : e.styleBindings,
                a = Ir(i),
                l = Vr(i);
              t[r] = n;
              let c,
                u = !1;
              if (Array.isArray(n)) {
                const t = n;
                (c = t[1]), (null === c || oe(t, c) > 0) && (u = !0);
              } else c = n;
              if (s)
                if (0 !== l) {
                  const e = Ir(t[a + 1]);
                  (t[r + 1] = Rr(e, a)),
                    0 !== e && (t[e + 1] = jr(t[e + 1], r)),
                    (t[a + 1] = (131071 & t[a + 1]) | (r << 17));
                } else
                  (t[r + 1] = Rr(a, 0)),
                    0 !== a && (t[a + 1] = jr(t[a + 1], r)),
                    (a = r);
              else
                (t[r + 1] = Rr(l, 0)),
                  0 === a ? (a = r) : (t[l + 1] = jr(t[l + 1], r)),
                  (l = r);
              u && (t[r + 1] = Nr(t[r + 1])),
                Ko(t, c, r, !0),
                Ko(t, c, r, !1),
                (function (t, e, n, r, s) {
                  const o = s ? t.residualClasses : t.residualStyles;
                  null != o &&
                    "string" == typeof e &&
                    oe(o, e) >= 0 &&
                    (n[r + 1] = Dr(n[r + 1]));
                })(e, c, t, r, o),
                (i = Rr(a, l)),
                o ? (e.classBindings = i) : (e.styleBindings = i);
            })(s, o, e, n, i, r);
        }
      }
      function ci(t, e, n, r, s) {
        let o = null;
        const i = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < i && ((o = e[a]), (r = ui(r, o.hostAttrs, s)), o !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), r;
      }
      function ui(t, e, n) {
        const r = n ? 1 : 2;
        let s = -1;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const i = e[o];
            "number" == typeof i
              ? (s = i)
              : s === r &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                re(t, i, !!n || e[++o]));
          }
        return void 0 === t ? null : t;
      }
      function hi(t, e, n, r, s, o, i, a) {
        if (3 !== e.type) return;
        const l = t.data,
          c = l[a + 1];
        pi(1 == (1 & c) ? di(l, e, n, s, Vr(c), i) : void 0) ||
          (pi(o) ||
            ((function (t) {
              return 2 == (2 & t);
            })(c) &&
              (o = di(l, null, n, s, a, i))),
          (function (t, e, n, r, s) {
            const o = Te(t);
            if (e)
              s
                ? o
                  ? t.addClass(n, r)
                  : n.classList.add(r)
                : o
                ? t.removeClass(n, r)
                : n.classList.remove(r);
            else {
              const e = -1 == r.indexOf("-") ? void 0 : 2;
              null == s
                ? o
                  ? t.removeStyle(n, r, e)
                  : n.style.removeProperty(r)
                : o
                ? t.setStyle(n, r, s, e)
                : n.style.setProperty(r, s);
            }
          })(r, i, Re(pn(), n), s, o));
      }
      function di(t, e, n, r, s, o) {
        const i = null === e;
        let a = void 0;
        for (; s > 0; ) {
          const e = t[s],
            o = Array.isArray(e),
            l = o ? e[1] : e,
            c = null === l;
          let u = n[s + 1];
          u === Or && (u = c ? Qo : void 0);
          let h = c ? se(u, r) : l === r ? u : void 0;
          if ((o && !pi(h) && (h = se(e, r)), pi(h) && ((a = h), i))) return a;
          const d = t[s + 1];
          s = i ? Ir(d) : Vr(d);
        }
        if (null !== e) {
          let t = o ? e.residualClasses : e.residualStyles;
          null != t && (a = se(t, r));
        }
        return a;
      }
      function pi(t) {
        return void 0 !== t;
      }
      function fi(t, e) {
        return 0 != (t.flags & (e ? 16 : 32));
      }
      function gi(t, e = "") {
        const n = qe(),
          r = Be(),
          s = t + 20,
          o = r.firstCreatePass ? Hr(r, n[6], t, 3, null, null) : r.data[s],
          i = (n[s] = (function (t, e) {
            return Te(e) ? e.createText(t) : e.createTextNode(t);
          })(e, n[11]));
        Fs(r, n, i, o), Ze(o, !1);
      }
      function mi(t) {
        return yi("", t, ""), mi;
      }
      function yi(t, e, n) {
        const r = qe(),
          s = Ao(r, t, e, n);
        return (
          s !== Or &&
            (function (t, e, n) {
              const r = Re(e, t),
                s = t[11];
              Te(s) ? s.setValue(r, n) : (r.textContent = n);
            })(r, pn(), s),
          yi
        );
      }
      function _i(t, e, n) {
        const r = qe();
        return Po(r, Xe(), e) && Yr(Be(), gn(), r, t, e, r[11], n, !0), _i;
      }
      function vi(t, e) {
        const n = je(t)[1],
          r = n.data.length - 1;
        mn(n, { directiveStart: r, directiveEnd: r + 1 });
      }
      function bi(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const r = [t];
        for (; e; ) {
          let s = void 0;
          if (ke(t)) s = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            s = e.ɵdir;
          }
          if (s) {
            if (n) {
              r.push(s);
              const e = t;
              (e.inputs = wi(t.inputs)),
                (e.declaredInputs = wi(t.declaredInputs)),
                (e.outputs = wi(t.outputs));
              const n = s.hostBindings;
              n && Si(t, n);
              const o = s.viewQuery,
                i = s.contentQueries;
              if (
                (o && Ci(t, o),
                i && xi(t, i),
                lt(t.inputs, s.inputs),
                lt(t.declaredInputs, s.declaredInputs),
                lt(t.outputs, s.outputs),
                ke(s) && s.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(s.data.animation);
              }
              (e.afterContentChecked =
                e.afterContentChecked || s.afterContentChecked),
                (e.afterContentInit = t.afterContentInit || s.afterContentInit),
                (e.afterViewChecked = t.afterViewChecked || s.afterViewChecked),
                (e.afterViewInit = t.afterViewInit || s.afterViewInit),
                (e.doCheck = t.doCheck || s.doCheck),
                (e.onDestroy = t.onDestroy || s.onDestroy),
                (e.onInit = t.onInit || s.onInit);
            }
            const e = s.features;
            if (e)
              for (let r = 0; r < e.length; r++) {
                const s = e[r];
                s && s.ngInherit && s(t), s === bi && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function (t) {
          let e = 0,
            n = null;
          for (let r = t.length - 1; r >= 0; r--) {
            const s = t[r];
            (s.hostVars = e += s.hostVars),
              (s.hostAttrs = kn(s.hostAttrs, (n = kn(n, s.hostAttrs))));
          }
        })(r);
      }
      function wi(t) {
        return t === le ? {} : t === ce ? [] : t;
      }
      function Ci(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      function xi(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, r, s) => {
              e(t, r, s), n(t, r, s);
            }
          : e;
      }
      function Si(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, r) => {
              e(t, r), n(t, r);
            }
          : e;
      }
      class Oi {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ki(t) {
        t.type.prototype.ngOnChanges &&
          ((t.setInput = Ei),
          (t.onChanges = function () {
            const t = Pi(this),
              e = t && t.current;
            if (e) {
              const n = t.previous;
              if (n === le) t.previous = e;
              else for (let t in e) n[t] = e[t];
              (t.current = null), this.ngOnChanges(e);
            }
          }));
      }
      function Ei(t, e, n, r) {
        const s =
            Pi(t) ||
            (function (t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: le, current: null }),
          o = s.current || (s.current = {}),
          i = s.previous,
          a = this.declaredInputs[n],
          l = i[a];
        (o[a] = new Oi(l && l.currentValue, e, i === le)), (t[r] = e);
      }
      function Pi(t) {
        return t.__ngSimpleChanges__ || null;
      }
      function Ti(t, e, n, r, s) {
        if (((t = xt(t)), Array.isArray(t)))
          for (let o = 0; o < t.length; o++) Ti(t[o], e, n, r, s);
        else {
          const o = Be(),
            i = qe();
          let a = go(t) ? t : xt(t.provide),
            l = ho(t);
          const c = We(),
            u = 65535 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 16;
          if (go(t) || !t.multi) {
            const r = new Cn(l, s, Io),
              p = Ri(a, e, s ? u : u + d, h);
            -1 === p
              ? ($n(Fn(c, i), o, a),
                Ai(o, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 65536),
                n.push(r),
                i.push(r))
              : ((n[p] = r), (i[p] = r));
          } else {
            const p = Ri(a, e, u + d, h),
              f = Ri(a, e, u, u + d),
              g = p >= 0 && n[p],
              m = f >= 0 && n[f];
            if ((s && !m) || (!s && !g)) {
              $n(Fn(c, i), o, a);
              const u = (function (t, e, n, r, s) {
                const o = new Cn(t, n, Io);
                return (
                  (o.multi = []),
                  (o.index = e),
                  (o.componentProviders = 0),
                  Mi(o, s, r && !n),
                  o
                );
              })(s ? Ni : Ii, n.length, s, r, l);
              !s && m && (n[f].providerFactory = u),
                Ai(o, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                s && (c.providerIndexes += 65536),
                n.push(u),
                i.push(u);
            } else Ai(o, t, p > -1 ? p : f, Mi(n[s ? f : p], l, !s && r));
            !s && r && m && n[f].componentProviders++;
          }
        }
      }
      function Ai(t, e, n, r) {
        const s = go(e);
        if (s || e.useClass) {
          const o = (e.useClass || e).prototype.ngOnDestroy;
          if (o) {
            const i = t.destroyHooks || (t.destroyHooks = []);
            if (!s && e.multi) {
              const t = i.indexOf(n);
              -1 === t ? i.push(n, [r, o]) : i[t + 1].push(r, o);
            } else i.push(n, o);
          }
        }
      }
      function Mi(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Ri(t, e, n, r) {
        for (let s = n; s < r; s++) if (e[s] === t) return s;
        return -1;
      }
      function Ii(t, e, n, r) {
        return Vi(this.multi, []);
      }
      function Ni(t, e, n, r) {
        const s = this.multi;
        let o;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Zn(n, n[1], this.providerFactory.index, r);
          (o = e.slice(0, t)), Vi(s, o);
          for (let n = t; n < e.length; n++) o.push(e[n]);
        } else (o = []), Vi(s, o);
        return o;
      }
      function Vi(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function ji(t, e = []) {
        return (n) => {
          n.providersResolver = (n, r) =>
            (function (t, e, n) {
              const r = Be();
              if (r.firstCreatePass) {
                const s = ke(t);
                Ti(n, r.data, r.blueprint, s, !0),
                  Ti(e, r.data, r.blueprint, s, !1);
              }
            })(n, r ? r(t) : t, e);
        };
      }
      ki.ngInherit = !0;
      class Di {}
      class Ui {
        resolveComponentFactory(t) {
          throw (function (t) {
            const e = Error(
              `No component factory found for ${vt(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Fi = (() => {
          class t {}
          return (t.NULL = new Ui()), t;
        })(),
        Li = (() => {
          class t {
            constructor(t) {
              this.nativeElement = t;
            }
          }
          return (t.__NG_ELEMENT_ID__ = () => Hi(t)), t;
        })();
      const Hi = function (t) {
        return Js(t, We(), qe());
      };
      class zi {}
      const $i = (function () {
        var t = { Important: 1, DashCase: 2 };
        return (t[t.Important] = "Important"), (t[t.DashCase] = "DashCase"), t;
      })();
      let qi = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => Bi()), t;
      })();
      const Bi = function () {
        const t = qe(),
          e = Ve(We().index, t);
        return (function (t) {
          const e = t[11];
          if (Te(e)) return e;
          throw new Error(
            "Cannot inject Renderer2 when the application uses Renderer3!"
          );
        })(we(e) ? e : t);
      };
      let Gi = (() => {
        class t {}
        return (
          (t.ɵprov = ct({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class Wi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Zi = new Wi("9.1.11");
      class Qi {
        constructor() {}
        supports(t) {
          return ko(t);
        }
        create(t) {
          return new Ji(t);
        }
      }
      const Ki = (t, e) => e;
      class Ji {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || Ki);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            r = 0,
            s = null;
          for (; e || n; ) {
            const o = !n || (e && e.currentIndex < ea(n, r, s)) ? e : n,
              i = ea(o, r, s),
              a = o.currentIndex;
            if (o === n) r--, (n = n._nextRemoved);
            else if (((e = e._next), null == o.previousIndex)) r++;
            else {
              s || (s = []);
              const t = i - r,
                e = a - r;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const r = n < s.length ? s[n] : (s[n] = 0),
                    o = r + n;
                  e <= o && o < t && (s[n] = r + 1);
                }
                s[o.previousIndex] = e - t;
              }
            }
            i !== a && t(o, i, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !ko(t)))
            throw new Error(
              `Error trying to diff '${vt(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            r,
            s = this._itHead,
            o = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (r = this._trackByFn(e, n)),
                null !== s && Oo(s.trackById, r)
                  ? (o && (s = this._verifyReinsertion(s, n, r, e)),
                    Oo(s.item, n) || this._addIdentityChange(s, n))
                  : ((s = this._mismatch(s, n, r, e)), (o = !0)),
                (s = s._next);
          } else
            (e = 0),
              (function (t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[So()]();
                  let r;
                  for (; !(r = n.next()).done; ) e(r.value);
                }
              })(t, (t) => {
                (r = this._trackByFn(e, t)),
                  null !== s && Oo(s.trackById, r)
                    ? (o && (s = this._verifyReinsertion(s, t, r, e)),
                      Oo(s.item, t) || this._addIdentityChange(s, t))
                    : ((s = this._mismatch(s, t, r, e)), (o = !0)),
                  (s = s._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(s), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t, e;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = e
            )
              (t.previousIndex = t.currentIndex), (e = t._nextMoved);
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, r) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, r))
              ? (Oo(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, s, r))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Oo(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, s, r))
              : (t = this._addAfter(new Yi(e, n), s, r)),
            t
          );
        }
        _verifyReinsertion(t, e, n, r) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, r))
              : t.currentIndex != r &&
                ((t.currentIndex = r), this._addToMoves(t, r)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const r = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === r ? (this._removalsHead = s) : (r._nextRemoved = s),
            null === s ? (this._removalsTail = r) : (s._prevRemoved = r),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const r = null === e ? this._itHead : e._next;
          return (
            (t._next = r),
            (t._prev = e),
            null === r ? (this._itTail = t) : (r._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ta()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ta()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class Yi {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class Xi {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if ((null === e || e <= n.currentIndex) && Oo(n.trackById, t))
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class ta {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new Xi()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ea(t, e, n) {
        const r = t.previousIndex;
        if (null === r) return r;
        let s = 0;
        return n && r < n.length && (s = n[r]), r + e + s;
      }
      class na {
        constructor() {}
        supports(t) {
          return t instanceof Map || Eo(t);
        }
        create() {
          return new ra();
        }
      }
      class ra {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || Eo(t)))
              throw new Error(
                `Error trying to diff '${vt(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const r = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, r);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const r = n._prev,
              s = n._next;
            return (
              r && (r._next = s),
              s && (s._prev = r),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new sa(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Oo(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach((n) => e(t[n], n));
        }
      }
      class sa {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let oa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ot(), new rt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${
                  ((n = t), n.name || typeof n)
                }'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new Qi()]),
            })),
            t
          );
        })(),
        ia = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: (n) => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new ot(), new rt()]],
              };
            }
            find(t) {
              const e = this.factories.find((e) => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new t([new na()]),
            })),
            t
          );
        })();
      const aa = [new na()],
        la = new oa([new Qi()]),
        ca = new ia(aa);
      let ua = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ha(t, Li)), t;
      })();
      const ha = function (t, e) {
        return Ys(t, e, We(), qe());
      };
      let da = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => pa(t, Li)), t;
      })();
      const pa = function (t, e) {
          return Xs(t, e, We(), qe());
        },
        fa = {};
      class ga extends Fi {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = _e(t);
          return new _a(e, this.ngModule);
        }
      }
      function ma(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const ya = new Dt("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Nn,
      });
      class _a extends Di {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Sr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return ma(this.componentDef.inputs);
        }
        get outputs() {
          return ma(this.componentDef.outputs);
        }
        create(t, e, n, r) {
          const s = (r = r || this.ngModule)
              ? (function (t, e) {
                  return {
                    get: (n, r, s) => {
                      const o = t.get(n, fa, s);
                      return o !== fa || r === fa ? o : e.get(n, r, s);
                    },
                  };
                })(t, r.injector)
              : t,
            o = s.get(zi, Ae),
            i = s.get(Gi, null),
            a = o.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function (t, e, n) {
                  if (Te(t)) return t.selectRootElement(e, n === ae.ShadowDom);
                  let r = "string" == typeof e ? t.querySelector(e) : e;
                  return (r.textContent = ""), r;
                })(a, n, this.componentDef.encapsulation)
              : Fr(
                  l,
                  o.createRenderer(null, this.componentDef),
                  (function (t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h =
              "string" == typeof n && /^#root-ng-internal-isolated-\d+/.test(n),
            d = {
              components: [],
              scheduler: Nn,
              clean: vs,
              playerHandler: null,
              flags: 0,
            },
            p = Qr(0, -1, null, 1, 0, null, null, null, null, null),
            f = Lr(null, p, d, u, null, null, o, a, i, s);
          let g, m;
          an(f, null);
          try {
            const t = (function (t, e, n, r, s, o) {
              const i = n[1];
              n[20] = t;
              const a = Hr(i, null, 0, 3, null, null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Co(a, l, !0),
                null !== t &&
                  (xn(s, t, l),
                  null !== a.classes && Bs(s, t, a.classes),
                  null !== a.styles && qs(s, t, a.styles)));
              const c = r.createRenderer(t, e),
                u = Lr(
                  n,
                  Zr(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  r,
                  c,
                  void 0
                );
              return (
                i.firstCreatePass &&
                  ($n(Fn(a, n), i, e.type), ss(i, a), is(a, n.length, 1)),
                fs(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, f, o, a);
            if (c)
              if (n) xn(a, c, ["ng-version", Zi.full]);
              else {
                const { attrs: t, classes: e } = (function (t) {
                  const e = [],
                    n = [];
                  let r = 1,
                    s = 2;
                  for (; r < t.length; ) {
                    let o = t[r];
                    if ("string" == typeof o)
                      2 === s
                        ? "" !== o && e.push(o, t[++r])
                        : 8 === s && n.push(o);
                    else {
                      if (!br(s)) break;
                      s = o;
                    }
                    r++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && xn(a, c, t), e && e.length > 0 && Bs(a, c, e.join(" "));
              }
            if (((m = Ne(p, 0)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const r = e[n];
                t.push(null != r ? Array.from(r) : null);
              }
            }
            (g = (function (t, e, n, r, s) {
              const o = n[1],
                i = (function (t, e, n) {
                  const r = We();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    rs(t, r, 1),
                    as(t, e, n));
                  const s = Zn(e, t, e.length - 1, r);
                  dr(s, e);
                  const o = Ie(r, e);
                  return o && dr(o, e), s;
                })(o, n, e);
              r.components.push(i),
                (t[8] = i),
                s && s.forEach((t) => t(i, e)),
                e.contentQueries && e.contentQueries(1, i, n.length - 1);
              const a = We();
              if (
                o.firstCreatePass &&
                (null !== e.hostBindings || null !== e.hostAttrs)
              ) {
                fn(a.index - 20);
                const t = n[1];
                ts(t, e), es(t, n, e.hostVars), ns(e, i);
              }
              return i;
            })(t, this.componentDef, f, d, [vi])),
              zr(p, f, null);
          } finally {
            dn();
          }
          const y = new va(this.componentType, g, Js(Li, m, f), f, m);
          return (n && !h) || (p.node.child = m), y;
        }
      }
      class va extends class {} {
        constructor(t, e, n, r, s) {
          super(),
            (this.location = n),
            (this._rootLView = r),
            (this._tNode = s),
            (this.destroyCbs = []),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new Ws(r)),
            (function (t, e, n, r) {
              let s = t.node;
              null == s && (t.node = s = Kr(0, null, 2, -1, null, null)),
                (r[6] = s);
            })(r[1], 0, 0, r),
            (this.componentType = t);
        }
        get injector() {
          return new Jn(this._tNode, this._rootLView);
        }
        destroy() {
          this.destroyCbs &&
            (this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null),
            !this.hostView.destroyed && this.hostView.destroy());
        }
        onDestroy(t) {
          this.destroyCbs && this.destroyCbs.push(t);
        }
      }
      const ba = void 0;
      var wa = [
        "en",
        [["a", "p"], ["AM", "PM"], ba],
        [["AM", "PM"], ba, ba],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
        ],
        ba,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        ],
        ba,
        [
          ["B", "A"],
          ["BC", "AD"],
          ["Before Christ", "Anno Domini"],
        ],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", ba, "{1} 'at' {0}", ba],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":",
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function (t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        },
      ];
      let Ca = {};
      function xa(t) {
        return (
          t in Ca ||
            (Ca[t] =
              Tt.ng &&
              Tt.ng.common &&
              Tt.ng.common.locales &&
              Tt.ng.common.locales[t]),
          Ca[t]
        );
      }
      const Sa = (function () {
        var t = {
          LocaleId: 0,
          DayPeriodsFormat: 1,
          DayPeriodsStandalone: 2,
          DaysFormat: 3,
          DaysStandalone: 4,
          MonthsFormat: 5,
          MonthsStandalone: 6,
          Eras: 7,
          FirstDayOfWeek: 8,
          WeekendRange: 9,
          DateFormat: 10,
          TimeFormat: 11,
          DateTimeFormat: 12,
          NumberSymbols: 13,
          NumberFormats: 14,
          CurrencyCode: 15,
          CurrencySymbol: 16,
          CurrencyName: 17,
          Currencies: 18,
          Directionality: 19,
          PluralCase: 20,
          ExtraData: 21,
        };
        return (
          (t[t.LocaleId] = "LocaleId"),
          (t[t.DayPeriodsFormat] = "DayPeriodsFormat"),
          (t[t.DayPeriodsStandalone] = "DayPeriodsStandalone"),
          (t[t.DaysFormat] = "DaysFormat"),
          (t[t.DaysStandalone] = "DaysStandalone"),
          (t[t.MonthsFormat] = "MonthsFormat"),
          (t[t.MonthsStandalone] = "MonthsStandalone"),
          (t[t.Eras] = "Eras"),
          (t[t.FirstDayOfWeek] = "FirstDayOfWeek"),
          (t[t.WeekendRange] = "WeekendRange"),
          (t[t.DateFormat] = "DateFormat"),
          (t[t.TimeFormat] = "TimeFormat"),
          (t[t.DateTimeFormat] = "DateTimeFormat"),
          (t[t.NumberSymbols] = "NumberSymbols"),
          (t[t.NumberFormats] = "NumberFormats"),
          (t[t.CurrencyCode] = "CurrencyCode"),
          (t[t.CurrencySymbol] = "CurrencySymbol"),
          (t[t.CurrencyName] = "CurrencyName"),
          (t[t.Currencies] = "Currencies"),
          (t[t.Directionality] = "Directionality"),
          (t[t.PluralCase] = "PluralCase"),
          (t[t.ExtraData] = "ExtraData"),
          t
        );
      })();
      let Oa = "en-US";
      function ka(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function (t, e, n, r) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Oa = t.toLowerCase().replace(/_/g, "-"));
      }
      const Ea = new Map();
      class Pa extends Jt {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ga(this));
          const n = be(t),
            r = t[Nt] || null;
          r && ka(r),
            (this._bootstrapComponents = Vn(n.bootstrap)),
            (this._r3Injector = lo(
              t,
              e,
              [
                { provide: Jt, useValue: this },
                { provide: Fi, useValue: this.componentFactoryResolver },
              ],
              vt(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = yo.THROW_IF_NOT_FOUND, n = it.Default) {
          return t === yo || t === Jt || t === Ut
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((t) => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ta extends Yt {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== be(t) &&
              (function t(e) {
                if (null !== e.ɵmod.id) {
                  const t = e.ɵmod.id;
                  (function (t, e, n) {
                    if (e && e !== n)
                      throw new Error(
                        `Duplicate module registered for ${t} - ${vt(
                          e
                        )} vs ${vt(e.name)}`
                      );
                  })(t, Ea.get(t), e),
                    Ea.set(t, e);
                }
                let n = e.ɵmod.imports;
                n instanceof Function && (n = n()), n && n.forEach((e) => t(e));
              })(t);
        }
        create(t) {
          return new Pa(this.moduleType, t);
        }
      }
      class Aa extends O {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let r,
            s = (t) => null,
            o = () => null;
          t && "object" == typeof t
            ? ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t.next(e));
                  }
                : (e) => {
                    t.next(e);
                  }),
              t.error &&
                (s = this.__isAsync
                  ? (e) => {
                      setTimeout(() => t.error(e));
                    }
                  : (e) => {
                      t.error(e);
                    }),
              t.complete &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((r = this.__isAsync
                ? (e) => {
                    setTimeout(() => t(e));
                  }
                : (e) => {
                    t(e);
                  }),
              e &&
                (s = this.__isAsync
                  ? (t) => {
                      setTimeout(() => e(t));
                    }
                  : (t) => {
                      e(t);
                    }),
              n &&
                (o = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const i = super.subscribe(r, s, o);
          return t instanceof h && t.add(i), i;
        }
      }
      function Ma() {
        return this._results[So()]();
      }
      class Ra {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Aa()),
            (this.length = 0);
          const t = So(),
            e = Ra.prototype;
          e[t] || (e[t] = Ma);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = (function t(e, n) {
            void 0 === n && (n = e);
            for (let r = 0; r < e.length; r++) {
              let s = e[r];
              Array.isArray(s)
                ? (n === e && (n = e.slice(0, r)), t(s, n))
                : n !== e && n.push(s);
            }
            return n;
          })(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Ia {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ia(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Na {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              r = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              r.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Na(r);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== Ga(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Va {
        constructor(t, e, n, r = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = r);
        }
      }
      class ja {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const r = null !== e ? e.length : 0,
              s = this.getByIndex(n).embeddedTView(t, r);
            s &&
              ((s.indexInDeclarationView = n),
              null !== e ? e.push(s) : (e = [s]));
          }
          return null !== e ? new ja(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Da {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Da(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 4 === n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          if (Array.isArray(this.metadata.predicate)) {
            const n = this.metadata.predicate;
            for (let r = 0; r < n.length; r++)
              this.matchTNodeWithReadOption(t, e, Ua(e, n[r]));
          } else {
            const n = this.metadata.predicate;
            n === ua
              ? 0 === e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, Wn(e, t, n, !1, !1));
          }
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const r = this.metadata.read;
            if (null !== r)
              if (r === Li || r === da || (r === ua && 0 === e.type))
                this.addMatch(e.index, -2);
              else {
                const n = Wn(e, t, r, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function Ua(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) if (n[r] === e) return n[r + 1];
        return null;
      }
      function Fa(t, e, n, r) {
        return -1 === n
          ? (function (t, e) {
              return 3 === t.type || 4 === t.type
                ? Js(Li, t, e)
                : 0 === t.type
                ? Ys(ua, Li, t, e)
                : null;
            })(e, t)
          : -2 === n
          ? (function (t, e, n) {
              return n === Li
                ? Js(Li, e, t)
                : n === ua
                ? Ys(ua, Li, e, t)
                : n === da
                ? Xs(da, Li, e, t)
                : void 0;
            })(t, e, r)
          : Zn(t, t[1], n, e);
      }
      function La(t, e, n, r) {
        const s = e[19].queries[r];
        if (null === s.matches) {
          const r = t.data,
            o = n.matches,
            i = [];
          for (let t = 0; t < o.length; t += 2) {
            const s = o[t];
            i.push(s < 0 ? null : Fa(e, r[s], o[t + 1], n.metadata.read));
          }
          s.matches = i;
        }
        return s.matches;
      }
      function Ha(t) {
        const e = qe(),
          n = Be(),
          r = rn();
        sn(r + 1);
        const s = Ga(n, r);
        if (t.dirty && De(e) === s.metadata.isStatic) {
          if (null === s.matches) t.reset([]);
          else {
            const o = s.crossesNgTemplate
              ? (function t(e, n, r, s) {
                  const o = e.queries.getByIndex(r),
                    i = o.matches;
                  if (null !== i) {
                    const a = La(e, n, o, r);
                    for (let e = 0; e < i.length; e += 2) {
                      const r = i[e];
                      if (r > 0) s.push(a[e / 2]);
                      else {
                        const o = i[e + 1],
                          a = n[-r];
                        for (let e = 10; e < a.length; e++) {
                          const n = a[e];
                          n[17] === n[3] && t(n[1], n, o, s);
                        }
                        if (null !== a[9]) {
                          const e = a[9];
                          for (let n = 0; n < e.length; n++) {
                            const r = e[n];
                            t(r[1], r, o, s);
                          }
                        }
                      }
                    }
                  }
                  return s;
                })(n, e, r, [])
              : La(n, e, s, r);
            t.reset(o), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function za(t, e, n, r, s, o) {
        t.firstCreatePass &&
          (Ba(t, new Va(n, r, o, s), -1), o && (t.staticViewQueries = !0)),
          qa(t, e);
      }
      function $a() {
        return (t = qe()), (e = rn()), t[19].queries[e].queryList;
        var t, e;
      }
      function qa(t, e) {
        const n = new Ra();
        !(function (t, e, n, r) {
          const s = bs(e);
          s.push(n), t.firstCreatePass && ws(t).push(r, s.length - 1);
        })(t, e, n, n.destroy),
          null === e[19] && (e[19] = new Na()),
          e[19].queries.push(new Ia(n));
      }
      function Ba(t, e, n) {
        null === t.queries && (t.queries = new ja()),
          t.queries.track(new Da(e, n));
      }
      function Ga(t, e) {
        return t.queries.getByIndex(e);
      }
      function Wa(t, e) {
        return Ys(ua, Li, t, e);
      }
      const Za = new Dt("Application Initializer");
      let Qa = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                zo(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch((t) => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Za, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ka = new Dt("AppId"),
        Ja = {
          provide: Ka,
          useFactory: function () {
            return `${Ya()}${Ya()}${Ya()}`;
          },
          deps: [],
        };
      function Ya() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const Xa = new Dt("Platform Initializer"),
        tl = new Dt("Platform ID"),
        el = new Dt("appBootstrapListener");
      let nl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const rl = new Dt("LocaleId"),
        sl = new Dt("DefaultCurrencyCode");
      class ol {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const il = function (t) {
          return new Ta(t);
        },
        al = il,
        ll = function (t) {
          return Promise.resolve(il(t));
        },
        cl = function (t) {
          const e = il(t),
            n = Vn(be(t).declarations).reduce((t, e) => {
              const n = _e(e);
              return n && t.push(new _a(n)), t;
            }, []);
          return new ol(e, n);
        },
        ul = cl,
        hl = function (t) {
          return Promise.resolve(cl(t));
        };
      let dl = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = al),
              (this.compileModuleAsync = ll),
              (this.compileModuleAndAllComponentsSync = ul),
              (this.compileModuleAndAllComponentsAsync = hl);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const pl = new Dt("compilerOptions"),
        fl = (() => Promise.resolve(0))();
      function gl(t) {
        "undefined" == typeof Zone
          ? fl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class ml {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Aa(!1)),
            (this.onMicrotaskEmpty = new Aa(!1)),
            (this.onStable = new Aa(!1)),
            (this.onError = new Aa(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched(),
            (this._nesting = 0),
            (this._outer = this._inner = Zone.current),
            Zone.wtfZoneSpec &&
              (this._inner = this._inner.fork(Zone.wtfZoneSpec)),
            Zone.TaskTrackingZoneSpec &&
              (this._inner = this._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (this._inner = this._inner.fork(Zone.longStackTraceZoneSpec)),
            (this.shouldCoalesceEventChangeDetection = e),
            (this.lastRequestAnimationFrameId = -1),
            (this.nativeRequestAnimationFrame = (function () {
              let t = Tt.requestAnimationFrame,
                e = Tt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const r = e[Zone.__symbol__("OriginalDelegate")];
                r && (e = r);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e,
              };
            })().nativeRequestAnimationFrame),
            (function (t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function (t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId =
                        t.nativeRequestAnimationFrame.call(Tt, () => {
                          (t.lastRequestAnimationFrameId = -1), bl(t), vl(t);
                        })),
                      bl(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, r, s, o, i, a) => {
                  try {
                    return wl(t), n.invokeTask(s, o, i, a);
                  } finally {
                    e && "eventTask" === o.type && e(), Cl(t);
                  }
                },
                onInvoke: (e, n, r, s, o, i, a) => {
                  try {
                    return wl(t), e.invoke(r, s, o, i, a);
                  } finally {
                    Cl(t);
                  }
                },
                onHasTask: (e, n, r, s) => {
                  e.hasTask(r, s),
                    n === r &&
                      ("microTask" == s.change
                        ? ((t._hasPendingMicrotasks = s.microTask),
                          bl(t),
                          vl(t))
                        : "macroTask" == s.change &&
                          (t.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (e, n, r, s) => (
                  e.handleError(r, s),
                  t.runOutsideAngular(() => t.onError.emit(s)),
                  !1
                ),
              });
            })(this);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ml.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (ml.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, r) {
          const s = this._inner,
            o = s.scheduleEventTask("NgZoneEvent: " + r, t, _l, yl, yl);
          try {
            return s.runTask(o, e, n);
          } finally {
            s.cancelTask(o);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      function yl() {}
      const _l = {};
      function vl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function bl(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function wl(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Cl(t) {
        t._nesting--, vl(t);
      }
      class xl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Aa()),
            (this.onMicrotaskEmpty = new Aa()),
            (this.onStable = new Aa()),
            (this.onError = new Aa());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, r) {
          return t.apply(e, n);
        }
      }
      let Sl = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ml.assertNotInAngularZone(),
                        gl(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                gl(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (e) =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((t) => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data,
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let r = -1;
              e &&
                e > 0 &&
                (r = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (t) => t.timeoutId !== r
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: r, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(ml));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ol = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Pl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Pl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class kl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let El,
        Pl = new kl(),
        Tl = function (t, e, n) {
          const r = t.get(pl, []).concat(e),
            s = new Ta(n);
          if (0 === vo.size) return Promise.resolve(s);
          const o = (function (t) {
            const e = [];
            return t.forEach((t) => t && e.push(...t)), e;
          })(r.map((t) => t.providers));
          if (0 === o.length) return Promise.resolve(s);
          const i = (function () {
              const t = Tt.ng;
              if (!t || !t.ɵcompilerFacade)
                throw new Error(
                  "Angular JIT compilation failed: '@angular/compiler' not loaded!\n  - JIT compilation is discouraged for production use-cases! Consider AOT mode instead.\n  - Did you bootstrap using '@angular/platform-browser-dynamic' or '@angular/platform-server'?\n  - Alternatively provide the compiler with 'import \"@angular/compiler\";' before bootstrapping."
                );
              return t.ɵcompilerFacade;
            })(),
            a = yo.create({ providers: o }).get(i.ResourceLoader);
          return (function (t) {
            const e = [],
              n = new Map();
            function r(t) {
              let e = n.get(t);
              if (!e) {
                const r = ((t) => Promise.resolve(a.get(t)))(t);
                n.set(t, (e = r.then(wo)));
              }
              return e;
            }
            return (
              vo.forEach((t, n) => {
                const s = [];
                t.templateUrl &&
                  s.push(
                    r(t.templateUrl).then((e) => {
                      t.template = e;
                    })
                  );
                const o = t.styleUrls,
                  i = t.styles || (t.styles = []),
                  a = t.styles.length;
                o &&
                  o.forEach((e, n) => {
                    i.push(""),
                      s.push(
                        r(e).then((r) => {
                          (i[a + n] = r),
                            o.splice(o.indexOf(e), 1),
                            0 == o.length && (t.styleUrls = void 0);
                        })
                      );
                  });
                const l = Promise.all(s).then(() =>
                  (function (t) {
                    bo.delete(t);
                  })(n)
                );
                e.push(l);
              }),
              (vo = new Map()),
              Promise.all(e).then(() => {})
            );
          })().then(() => s);
        };
      const Al = new Dt("AllowMultipleToken");
      class Ml {
        constructor(t, e) {
          (this.name = t), (this.token = e);
        }
      }
      function Rl(t, e, n = []) {
        const r = "Platform: " + e,
          s = new Dt(r);
        return (e = []) => {
          let o = Il();
          if (!o || o.injector.get(Al, !1))
            if (t) t(n.concat(e).concat({ provide: s, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: s, useValue: !0 },
                  { provide: no, useValue: "platform" }
                );
              !(function (t) {
                if (El && !El.destroyed && !El.injector.get(Al, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                El = t.get(Nl);
                const e = t.get(Xa, null);
                e && e.forEach((t) => t());
              })(yo.create({ providers: t, name: r }));
            }
          return (function (t) {
            const e = Il();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(s);
        };
      }
      function Il() {
        return El && !El.destroyed ? El : null;
      }
      let Nl = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function (t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new xl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new ml({
                          enableLongStackTrace: ar(),
                          shouldCoalesceEventChangeDetection: e,
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              r = [{ provide: ml, useValue: n }];
            return n.run(() => {
              const e = yo.create({
                  providers: r,
                  parent: this.injector,
                  name: t.moduleType.name,
                }),
                s = t.create(e),
                o = s.injector.get(nr, null);
              if (!o)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                s.onDestroy(() => Dl(this._modules, s)),
                n.runOutsideAngular(() =>
                  n.onError.subscribe({
                    next: (t) => {
                      o.handleError(t);
                    },
                  })
                ),
                (function (t, e, n) {
                  try {
                    const r = n();
                    return zo(r)
                      ? r.catch((n) => {
                          throw (
                            (e.runOutsideAngular(() => t.handleError(n)), n)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (e.runOutsideAngular(() => t.handleError(r)), r);
                  }
                })(o, n, () => {
                  const t = s.injector.get(Qa);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        ka(s.injector.get(rl, "en-US") || "en-US"),
                        this._moduleDoBootstrap(s),
                        s
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Vl({}, e);
            return Tl(this.injector, n, t).then((t) =>
              this.bootstrapModuleFactory(t, n)
            );
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(jl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach((t) => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${vt(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach((t) => t.destroy()),
              this._destroyListeners.forEach((t) => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(yo));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Vl(t, e) {
        return Array.isArray(e)
          ? e.reduce(Vl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let jl = (() => {
        class t {
          constructor(t, e, n, r, s, o) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = r),
              (this._componentFactoryResolver = s),
              (this._initStatus = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._enforceNoNewChanges = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._enforceNoNewChanges = ar()),
              this._zone.onMicrotaskEmpty.subscribe({
                next: () => {
                  this._zone.run(() => {
                    this.tick();
                  });
                },
              });
            const i = new b((t) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new b((t) => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    ml.assertNotInAngularZone(),
                      gl(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  ml.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = (function (...t) {
              let e = Number.POSITIVE_INFINITY,
                n = null,
                r = t[t.length - 1];
              return (
                E(r)
                  ? ((n = t.pop()),
                    t.length > 1 &&
                      "number" == typeof t[t.length - 1] &&
                      (e = t.pop()))
                  : "number" == typeof r && (e = t.pop()),
                null === n && 1 === t.length && t[0] instanceof b
                  ? t[0]
                  : B(e)(G(t, n))
              );
            })(
              i,
              a.pipe((t) => {
                return W()(
                  ((e = X),
                  function (t) {
                    let n;
                    n =
                      "function" == typeof e
                        ? e
                        : function () {
                            return e;
                          };
                    const r = Object.create(t, J);
                    return (r.source = t), (r.subjectFactory = n), r;
                  })(t)
                );
                var e;
              })
            );
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Di
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const r = n.isBoundToModule ? void 0 : this._injector.get(Jt),
              s = n.create(yo.NULL, [], e || n.selector, r);
            s.onDestroy(() => {
              this._unloadComponent(s);
            });
            const o = s.injector.get(Sl, null);
            return (
              o &&
                s.injector
                  .get(Ol)
                  .registerApplication(s.location.nativeElement, o),
              this._loadComponent(s),
              ar() &&
                this._console.log(
                  "Angular is running in the development mode. Call enableProdMode() to enable the production mode."
                ),
              s
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
              if (this._enforceNoNewChanges)
                for (let t of this._views) t.checkNoChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Dl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(el, [])
                .concat(this._bootstrapListeners)
                .forEach((e) => e(t));
          }
          _unloadComponent(t) {
            this.detachView(t.hostView), Dl(this.components, t);
          }
          ngOnDestroy() {
            this._views.slice().forEach((t) => t.destroy());
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(ml), Wt(nl), Wt(yo), Wt(nr), Wt(Fi), Wt(Qa));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Dl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      class Ul {}
      class Fl {}
      const Ll = { factoryPathPrefix: "", factoryPathSuffix: ".ngfactory" };
      let Hl = (() => {
        class t {
          constructor(t, e) {
            (this._compiler = t), (this._config = e || Ll);
          }
          load(t) {
            return this.loadAndCompile(t);
          }
          loadAndCompile(t) {
            let [e, r] = t.split("#");
            return (
              void 0 === r && (r = "default"),
              n("zn8P")(e)
                .then((t) => t[r])
                .then((t) => zl(t, e, r))
                .then((t) => this._compiler.compileModuleAsync(t))
            );
          }
          loadFactory(t) {
            let [e, r] = t.split("#"),
              s = "NgFactory";
            return (
              void 0 === r && ((r = "default"), (s = "")),
              n("zn8P")(
                this._config.factoryPathPrefix +
                  e +
                  this._config.factoryPathSuffix
              )
                .then((t) => t[r + s])
                .then((t) => zl(t, e, r))
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(dl), Wt(Fl, 8));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function zl(t, e, n) {
        if (!t) throw new Error(`Cannot find '${n}' in '${e}'`);
        return t;
      }
      const $l = Rl(null, "core", [
          { provide: tl, useValue: "unknown" },
          { provide: Nl, deps: [yo] },
          { provide: Ol, deps: [] },
          { provide: nl, deps: [] },
        ]),
        ql = [
          { provide: jl, useClass: jl, deps: [ml, nl, yo, nr, Fi, Qa] },
          {
            provide: ya,
            deps: [ml],
            useFactory: function (t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function (t) {
                  e.push(t);
                }
              );
            },
          },
          { provide: Qa, useClass: Qa, deps: [[new rt(), Za]] },
          { provide: dl, useClass: dl, deps: [] },
          Ja,
          {
            provide: oa,
            useFactory: function () {
              return la;
            },
            deps: [],
          },
          {
            provide: ia,
            useFactory: function () {
              return ca;
            },
            deps: [],
          },
          {
            provide: rl,
            useFactory: function (t) {
              return (
                ka(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    "en-US")
                ),
                t
              );
            },
            deps: [[new nt(rl), new rt(), new ot()]],
          },
          { provide: sl, useValue: "USD" },
        ];
      let Bl = (() => {
          class t {
            constructor(t) {}
          }
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)(Wt(jl));
              },
              providers: ql,
            })),
            t
          );
        })(),
        Gl = null;
      function Wl() {
        return Gl;
      }
      const Zl = new Dt("DocumentToken");
      let Ql = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: Kl, token: t, providedIn: "platform" })),
          t
        );
      })();
      function Kl() {
        return Wt(Yl);
      }
      const Jl = new Dt("Location Initialized");
      let Yl = (() => {
        class t extends Ql {
          constructor(t) {
            super(), (this._doc = t), this._init();
          }
          _init() {
            (this.location = Wl().getLocation()),
              (this._history = Wl().getHistory());
          }
          getBaseHrefFromDOM() {
            return Wl().getBaseHref(this._doc);
          }
          onPopState(t) {
            Wl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("popstate", t, !1);
          }
          onHashChange(t) {
            Wl()
              .getGlobalEventTarget(this._doc, "window")
              .addEventListener("hashchange", t, !1);
          }
          get href() {
            return this.location.href;
          }
          get protocol() {
            return this.location.protocol;
          }
          get hostname() {
            return this.location.hostname;
          }
          get port() {
            return this.location.port;
          }
          get pathname() {
            return this.location.pathname;
          }
          get search() {
            return this.location.search;
          }
          get hash() {
            return this.location.hash;
          }
          set pathname(t) {
            this.location.pathname = t;
          }
          pushState(t, e, n) {
            Xl() ? this._history.pushState(t, e, n) : (this.location.hash = n);
          }
          replaceState(t, e, n) {
            Xl()
              ? this._history.replaceState(t, e, n)
              : (this.location.hash = n);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Zl));
          }),
          (t.ɵprov = ct({ factory: tc, token: t, providedIn: "platform" })),
          t
        );
      })();
      function Xl() {
        return !!window.history.pushState;
      }
      function tc() {
        return new Yl(Wt(Zl));
      }
      function ec(t, e) {
        if (0 == t.length) return e;
        if (0 == e.length) return t;
        let n = 0;
        return (
          t.endsWith("/") && n++,
          e.startsWith("/") && n++,
          2 == n ? t + e.substring(1) : 1 == n ? t + e : t + "/" + e
        );
      }
      function nc(t) {
        const e = t.match(/#|\?|$/),
          n = (e && e.index) || t.length;
        return t.slice(0, n - ("/" === t[n - 1] ? 1 : 0)) + t.slice(n);
      }
      function rc(t) {
        return t && "?" !== t[0] ? "?" + t : t;
      }
      let sc = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ factory: oc, token: t, providedIn: "root" })),
          t
        );
      })();
      function oc(t) {
        const e = Wt(Zl).location;
        return new ac(Wt(Ql), (e && e.origin) || "");
      }
      const ic = new Dt("appBaseHref");
      let ac = (() => {
          class t extends sc {
            constructor(t, e) {
              if (
                (super(),
                (this._platformLocation = t),
                null == e && (e = this._platformLocation.getBaseHrefFromDOM()),
                null == e)
              )
                throw new Error(
                  "No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document."
                );
              this._baseHref = e;
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(t) {
              return ec(this._baseHref, t);
            }
            path(t = !1) {
              const e =
                  this._platformLocation.pathname +
                  rc(this._platformLocation.search),
                n = this._platformLocation.hash;
              return n && t ? `${e}${n}` : e;
            }
            pushState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + rc(r));
              this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              const s = this.prepareExternalUrl(n + rc(r));
              this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Ql), Wt(ic, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        lc = (() => {
          class t extends sc {
            constructor(t, e) {
              super(),
                (this._platformLocation = t),
                (this._baseHref = ""),
                null != e && (this._baseHref = e);
            }
            onPopState(t) {
              this._platformLocation.onPopState(t),
                this._platformLocation.onHashChange(t);
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(t = !1) {
              let e = this._platformLocation.hash;
              return null == e && (e = "#"), e.length > 0 ? e.substring(1) : e;
            }
            prepareExternalUrl(t) {
              const e = ec(this._baseHref, t);
              return e.length > 0 ? "#" + e : e;
            }
            pushState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + rc(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.pushState(t, e, s);
            }
            replaceState(t, e, n, r) {
              let s = this.prepareExternalUrl(n + rc(r));
              0 == s.length && (s = this._platformLocation.pathname),
                this._platformLocation.replaceState(t, e, s);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Ql), Wt(ic, 8));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        cc = (() => {
          class t {
            constructor(t, e) {
              (this._subject = new Aa()),
                (this._urlChangeListeners = []),
                (this._platformStrategy = t);
              const n = this._platformStrategy.getBaseHref();
              (this._platformLocation = e),
                (this._baseHref = nc(hc(n))),
                this._platformStrategy.onPopState((t) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: t.state,
                    type: t.type,
                  });
                });
            }
            path(t = !1) {
              return this.normalize(this._platformStrategy.path(t));
            }
            getState() {
              return this._platformLocation.getState();
            }
            isCurrentPathEqualTo(t, e = "") {
              return this.path() == this.normalize(t + rc(e));
            }
            normalize(e) {
              return t.stripTrailingSlash(
                (function (t, e) {
                  return t && e.startsWith(t) ? e.substring(t.length) : e;
                })(this._baseHref, hc(e))
              );
            }
            prepareExternalUrl(t) {
              return (
                t && "/" !== t[0] && (t = "/" + t),
                this._platformStrategy.prepareExternalUrl(t)
              );
            }
            go(t, e = "", n = null) {
              this._platformStrategy.pushState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + rc(e)),
                  n
                );
            }
            replaceState(t, e = "", n = null) {
              this._platformStrategy.replaceState(n, "", t, e),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(t + rc(e)),
                  n
                );
            }
            forward() {
              this._platformStrategy.forward();
            }
            back() {
              this._platformStrategy.back();
            }
            onUrlChange(t) {
              this._urlChangeListeners.push(t),
                this.subscribe((t) => {
                  this._notifyUrlChangeListeners(t.url, t.state);
                });
            }
            _notifyUrlChangeListeners(t = "", e) {
              this._urlChangeListeners.forEach((n) => n(t, e));
            }
            subscribe(t, e, n) {
              return this._subject.subscribe({
                next: t,
                error: e,
                complete: n,
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(sc), Wt(Ql));
            }),
            (t.normalizeQueryParams = rc),
            (t.joinWithSlash = ec),
            (t.stripTrailingSlash = nc),
            (t.ɵprov = ct({ factory: uc, token: t, providedIn: "root" })),
            t
          );
        })();
      function uc() {
        return new cc(Wt(sc), Wt(Ql));
      }
      function hc(t) {
        return t.replace(/\/index.html$/, "");
      }
      const dc = (function () {
        var t = { Zero: 0, One: 1, Two: 2, Few: 3, Many: 4, Other: 5 };
        return (
          (t[t.Zero] = "Zero"),
          (t[t.One] = "One"),
          (t[t.Two] = "Two"),
          (t[t.Few] = "Few"),
          (t[t.Many] = "Many"),
          (t[t.Other] = "Other"),
          t
        );
      })();
      class pc {}
      let fc = (() => {
        class t extends pc {
          constructor(t) {
            super(), (this.locale = t);
          }
          getPluralCategory(t, e) {
            switch (
              (function (t) {
                return (function (t) {
                  const e = (function (t) {
                    return t.toLowerCase().replace(/_/g, "-");
                  })(t);
                  let n = xa(e);
                  if (n) return n;
                  const r = e.split("-")[0];
                  if (((n = xa(r)), n)) return n;
                  if ("en" === r) return wa;
                  throw new Error(`Missing locale data for the locale "${t}".`);
                })(t)[Sa.PluralCase];
              })(e || this.locale)(t)
            ) {
              case dc.Zero:
                return "zero";
              case dc.One:
                return "one";
              case dc.Two:
                return "two";
              case dc.Few:
                return "few";
              case dc.Many:
                return "many";
              default:
                return "other";
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(rl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function gc(t, e) {
        e = encodeURIComponent(e);
        for (const n of t.split(";")) {
          const t = n.indexOf("="),
            [r, s] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
          if (r.trim() === e) return decodeURIComponent(s);
        }
        return null;
      }
      class mc {
        constructor(t, e, n, r) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = r);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let yc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            ar() &&
              null != t &&
              "function" != typeof t &&
              console &&
              console.warn &&
              console.warn(
                `trackBy must be a function, but received ${JSON.stringify(
                  t
                )}. See https://angular.io/api/common/NgForOf#change-propagation for more information.`
              ),
              (this._trackByFn = t);
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${
                      ((t = n), t.name || typeof t)
                    }'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, r) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new mc(null, this._ngForOf, -1, -1),
                    null === r ? void 0 : r
                  ),
                  s = new _c(t, n);
                e.push(s);
              } else if (null == r)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const s = this._viewContainer.get(n);
                this._viewContainer.move(s, r);
                const o = new _c(t, s);
                e.push(o);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, r = this._viewContainer.length; n < r; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = r),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange((t) => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(da), Io(ua), Io(oa));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
          })),
          t
        );
      })();
      class _c {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let vc = (() => {
        class t {
          constructor(t, e) {
            (this._viewContainer = t),
              (this._context = new bc()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = e);
          }
          set ngIf(t) {
            (this._context.$implicit = this._context.ngIf = t),
              this._updateView();
          }
          set ngIfThen(t) {
            wc("ngIfThen", t),
              (this._thenTemplateRef = t),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(t) {
            wc("ngIfElse", t),
              (this._elseTemplateRef = t),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(da), Io(ua));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
          })),
          t
        );
      })();
      class bc {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function wc(t, e) {
        if (e && !e.createEmbeddedView)
          throw new Error(
            `${t} must be a TemplateRef, but received '${vt(e)}'.`
          );
      }
      let Cc = (() => {
          class t {
            constructor(t) {
              (this._viewContainerRef = t),
                (this._viewRef = null),
                (this.ngTemplateOutletContext = null),
                (this.ngTemplateOutlet = null);
            }
            ngOnChanges(t) {
              if (this._shouldRecreateView(t)) {
                const t = this._viewContainerRef;
                this._viewRef && t.remove(t.indexOf(this._viewRef)),
                  (this._viewRef = this.ngTemplateOutlet
                    ? t.createEmbeddedView(
                        this.ngTemplateOutlet,
                        this.ngTemplateOutletContext
                      )
                    : null);
              } else
                this._viewRef &&
                  this.ngTemplateOutletContext &&
                  this._updateExistingContext(this.ngTemplateOutletContext);
            }
            _shouldRecreateView(t) {
              const e = t.ngTemplateOutletContext;
              return (
                !!t.ngTemplateOutlet || (e && this._hasContextShapeChanged(e))
              );
            }
            _hasContextShapeChanged(t) {
              const e = Object.keys(t.previousValue || {}),
                n = Object.keys(t.currentValue || {});
              if (e.length === n.length) {
                for (let t of n) if (-1 === e.indexOf(t)) return !0;
                return !1;
              }
              return !0;
            }
            _updateExistingContext(t) {
              for (let e of Object.keys(t))
                this._viewRef.context[e] = this.ngTemplateOutletContext[e];
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(da));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [["", "ngTemplateOutlet", ""]],
              inputs: {
                ngTemplateOutletContext: "ngTemplateOutletContext",
                ngTemplateOutlet: "ngTemplateOutlet",
              },
              features: [ki],
            })),
            t
          );
        })(),
        xc = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [{ provide: pc, useClass: fc }],
            })),
            t
          );
        })(),
        Sc = (() => {
          class t {}
          return (
            (t.ɵprov = ct({
              token: t,
              providedIn: "root",
              factory: () => new Oc(Wt(Zl), window, Wt(nr)),
            })),
            t
          );
        })();
      class Oc {
        constructor(t, e, n) {
          (this.document = t),
            (this.window = e),
            (this.errorHandler = n),
            (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportScrollRestoration()
            ? [this.window.scrollX, this.window.scrollY]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportScrollRestoration() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (this.supportScrollRestoration()) {
            t =
              this.window.CSS && this.window.CSS.escape
                ? this.window.CSS.escape(t)
                : t.replace(/(\"|\'\ |:|\.|\[|\]|,|=)/g, "\\$1");
            try {
              const e = this.document.querySelector("#" + t);
              if (e) return void this.scrollToElement(e);
              const n = this.document.querySelector(`[name='${t}']`);
              if (n) return void this.scrollToElement(n);
            } catch (e) {
              this.errorHandler.handleError(e);
            }
          }
        }
        setHistoryScrollRestoration(t) {
          if (this.supportScrollRestoration()) {
            const e = this.window.history;
            e && e.scrollRestoration && (e.scrollRestoration = t);
          }
        }
        scrollToElement(t) {
          const e = t.getBoundingClientRect(),
            n = e.left + this.window.pageXOffset,
            r = e.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(n - s[0], r - s[1]);
        }
        supportScrollRestoration() {
          try {
            return !!this.window && !!this.window.scrollTo;
          } catch (t) {
            return !1;
          }
        }
      }
      class kc extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new kc()), Gl || (Gl = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            Pc || ((Pc = document.querySelector("base")), Pc)
              ? Pc.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              Ec || (Ec = document.createElement("a")),
              Ec.setAttribute("href", n),
              "/" === Ec.pathname.charAt(0) ? Ec.pathname : "/" + Ec.pathname);
          var n;
        }
        resetBaseElement() {
          Pc = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return gc(document.cookie, t);
        }
      }
      let Ec,
        Pc = null;
      const Tc = new Dt("TRANSITION_ID"),
        Ac = [
          {
            provide: Za,
            useFactory: function (t, e, n) {
              return () => {
                n.get(Qa).donePromise.then(() => {
                  const n = Wl();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter((e) => e.getAttribute("ng-transition") === t)
                    .forEach((t) => n.remove(t));
                });
              };
            },
            deps: [Tc, Zl, yo],
            multi: !0,
          },
        ];
      class Mc {
        static init() {
          var t;
          (t = new Mc()), (Pl = t);
        }
        addToWindow(t) {
          (Tt.getAngularTestability = (e, n = !0) => {
            const r = t.findTestabilityInTree(e, n);
            if (null == r)
              throw new Error("Could not find testability for element.");
            return r;
          }),
            (Tt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (Tt.getAllAngularRootElements = () => t.getAllRootElements()),
            Tt.frameworkStabilizers || (Tt.frameworkStabilizers = []),
            Tt.frameworkStabilizers.push((t) => {
              const e = Tt.getAllAngularTestabilities();
              let n = e.length,
                r = !1;
              const s = function (e) {
                (r = r || e), n--, 0 == n && t(r);
              };
              e.forEach(function (t) {
                t.whenStable(s);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const r = t.getTestability(e);
          return null != r
            ? r
            : n
            ? Wl().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const Rc = new Dt("EventManagerPlugins");
      let Ic = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach((t) => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let r = 0; r < n.length; r++) {
              const e = n[r];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Rc), Wt(ml));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Nc {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const r = Wl().getGlobalEventTarget(this._doc, t);
          if (!r)
            throw new Error(`Unsupported event target ${r} for event ${e}`);
          return this.addEventListener(r, e, n);
        }
      }
      let Vc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach((t) => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        jc = (() => {
          class t extends Vc {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach((t) => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach((e) => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach((t) => Wl().remove(t));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Zl));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Dc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
        },
        Uc = /%COMP%/g;
      function Fc(t, e, n) {
        for (let r = 0; r < e.length; r++) {
          let s = e[r];
          Array.isArray(s) ? Fc(t, s, n) : ((s = s.replace(Uc, t)), n.push(s));
        }
        return n;
      }
      function Lc(t) {
        return (e) => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Hc = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new zc(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case ae.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new $c(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case ae.Native:
              case ae.ShadowDom:
                return new qc(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = Fc(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Ic), Wt(jc), Wt(Ka));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class zc {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Dc[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, r) {
          if (r) {
            e = r + ":" + e;
            const s = Dc[r];
            s ? t.setAttributeNS(s, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const r = Dc[n];
            r ? t.removeAttributeNS(r, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, r) {
          r & $i.DashCase
            ? t.style.setProperty(e, n, r & $i.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & $i.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, Lc(n))
            : this.eventManager.addEventListener(t, e, Lc(n));
        }
      }
      class $c extends zc {
        constructor(t, e, n, r) {
          super(t), (this.component = n);
          const s = Fc(r + "-" + n.id, n.styles, []);
          e.addStyles(s),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Uc,
              r + "-" + n.id
            )),
            (this.hostAttr = (function (t) {
              return "_nghost-%COMP%".replace(Uc, t);
            })(r + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class qc extends zc {
        constructor(t, e, n, r) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.component = r),
            (this.shadowRoot =
              r.encapsulation === ae.ShadowDom
                ? n.attachShadow({ mode: "open" })
                : n.createShadowRoot()),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const s = Fc(r.id, r.styles, []);
          for (let o = 0; o < s.length; o++) {
            const t = document.createElement("style");
            (t.textContent = s[o]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Bc = (() => {
        class t extends Nc {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Zl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Gc = ["alt", "control", "meta", "shift"],
        Wc = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        Zc = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock",
        },
        Qc = {
          alt: (t) => t.altKey,
          control: (t) => t.ctrlKey,
          meta: (t) => t.metaKey,
          shift: (t) => t.shiftKey,
        };
      let Kc = (() => {
        class t extends Nc {
          constructor(t) {
            super(t);
          }
          supports(e) {
            return null != t.parseEventName(e);
          }
          addEventListener(e, n, r) {
            const s = t.parseEventName(n),
              o = t.eventCallback(s.fullKey, r, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Wl().onAndCancel(e, s.domEventName, o));
          }
          static parseEventName(e) {
            const n = e.toLowerCase().split("."),
              r = n.shift();
            if (0 === n.length || ("keydown" !== r && "keyup" !== r))
              return null;
            const s = t._normalizeKey(n.pop());
            let o = "";
            if (
              (Gc.forEach((t) => {
                const e = n.indexOf(t);
                e > -1 && (n.splice(e, 1), (o += t + "."));
              }),
              (o += s),
              0 != n.length || 0 === s.length)
            )
              return null;
            const i = {};
            return (i.domEventName = r), (i.fullKey = o), i;
          }
          static getEventFullKey(t) {
            let e = "",
              n = (function (t) {
                let e = t.key;
                if (null == e) {
                  if (((e = t.keyIdentifier), null == e)) return "Unidentified";
                  e.startsWith("U+") &&
                    ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                    3 === t.location && Zc.hasOwnProperty(e) && (e = Zc[e]));
                }
                return Wc[e] || e;
              })(t);
            return (
              (n = n.toLowerCase()),
              " " === n ? (n = "space") : "." === n && (n = "dot"),
              Gc.forEach((r) => {
                r != n && (0, Qc[r])(t) && (e += r + ".");
              }),
              (e += n),
              e
            );
          }
          static eventCallback(e, n, r) {
            return (s) => {
              t.getEventFullKey(s) === e && r.runGuarded(() => n(s));
            };
          }
          static _normalizeKey(t) {
            switch (t) {
              case "esc":
                return "escape";
              default:
                return t;
            }
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(Zl));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Jc = Rl($l, "browser", [
          { provide: tl, useValue: "browser" },
          {
            provide: Xa,
            useValue: function () {
              kc.makeCurrent(), Mc.init();
            },
            multi: !0,
          },
          {
            provide: Zl,
            useFactory: function () {
              return (
                (function (t) {
                  Pe = t;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Yc = [
          [],
          { provide: no, useValue: "root" },
          {
            provide: nr,
            useFactory: function () {
              return new nr();
            },
            deps: [],
          },
          { provide: Rc, useClass: Bc, multi: !0, deps: [Zl, ml, tl] },
          { provide: Rc, useClass: Kc, multi: !0, deps: [Zl] },
          [],
          { provide: Hc, useClass: Hc, deps: [Ic, jc, Ka] },
          { provide: zi, useExisting: Hc },
          { provide: Vc, useExisting: jc },
          { provide: jc, useClass: jc, deps: [Zl] },
          { provide: Sl, useClass: Sl, deps: [ml] },
          { provide: Ic, useClass: Ic, deps: [Rc, ml] },
          [],
        ];
      let Xc = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: Ka, useValue: e.appId },
                { provide: Tc, useExisting: Ka },
                Ac,
              ],
            };
          }
        }
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Wt(t, 12));
            },
            providers: Yc,
            imports: [xc, Bl],
          })),
          t
        );
      })();
      function tu(...t) {
        let e = t[t.length - 1];
        return E(e) ? (t.pop(), L(t, e)) : G(t);
      }
      function eu(t, e) {
        return z(t, e, 1);
      }
      function nu(t, e) {
        return function (n) {
          return n.lift(new ru(t, e));
        };
      }
      "undefined" != typeof window && window;
      class ru {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new su(t, this.predicate, this.thisArg));
        }
      }
      class su extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      class ou {}
      class iu {}
      class au {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach((t) => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                r = n.toLowerCase(),
                                s = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, r),
                                this.headers.has(r)
                                  ? this.headers.get(r).push(s)
                                  : this.headers.set(r, [s]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach((e) => {
                            let n = t[e];
                            const r = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(r, n),
                                this.maybeSetNormalizedName(e, r));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof au
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((e) => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new au();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof au
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const r = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              r.push(...n), this.headers.set(e, r);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter((t) => -1 === s.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((e) =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class lu {
        encodeKey(t) {
          return cu(t);
        }
        encodeValue(t) {
          return cu(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function cu(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class uu {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new lu()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function (t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach((t) => {
                    const r = t.indexOf("="),
                      [s, o] =
                        -1 == r
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, r)),
                              e.decodeValue(t.slice(r + 1)),
                            ],
                      i = n.get(s) || [];
                    i.push(o), n.set(s, i);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((e) => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((t) => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new uu({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function hu(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function du(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function pu(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class fu {
        constructor(t, e, n, r) {
          let s;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function (t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || r
              ? ((this.body = void 0 !== n ? n : null), (s = r))
              : (s = n),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new au()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new uu()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : hu(this.body) ||
              du(this.body) ||
              pu(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof uu
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || pu(this.body)
            ? null
            : du(this.body)
            ? this.body.type || null
            : hu(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof uu
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            r = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            o =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            i =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new fu(e, n, s, {
              params: l,
              headers: a,
              reportProgress: i,
              responseType: r,
              withCredentials: o,
            })
          );
        }
      }
      const gu = (function () {
        var t = {
          Sent: 0,
          UploadProgress: 1,
          ResponseHeader: 2,
          DownloadProgress: 3,
          Response: 4,
          User: 5,
        };
        return (
          (t[t.Sent] = "Sent"),
          (t[t.UploadProgress] = "UploadProgress"),
          (t[t.ResponseHeader] = "ResponseHeader"),
          (t[t.DownloadProgress] = "DownloadProgress"),
          (t[t.Response] = "Response"),
          (t[t.User] = "User"),
          t
        );
      })();
      class mu {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new au()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class yu extends mu {
        constructor(t = {}) {
          super(t), (this.type = gu.ResponseHeader);
        }
        clone(t = {}) {
          return new yu({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class _u extends mu {
        constructor(t = {}) {
          super(t),
            (this.type = gu.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new _u({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class vu extends mu {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? "Http failure during parsing for " +
                  (t.url || "(unknown url)")
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function bu(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials,
        };
      }
      let wu = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let r;
            if (t instanceof fu) r = t;
            else {
              let s = void 0;
              s = n.headers instanceof au ? n.headers : new au(n.headers);
              let o = void 0;
              n.params &&
                (o =
                  n.params instanceof uu
                    ? n.params
                    : new uu({ fromObject: n.params })),
                (r = new fu(t, e, void 0 !== n.body ? n.body : null, {
                  headers: s,
                  params: o,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials,
                }));
            }
            const s = tu(r).pipe(eu((t) => this.handler.handle(t)));
            if (t instanceof fu || "events" === n.observe) return s;
            const o = s.pipe(nu((t) => t instanceof _u));
            switch (n.observe || "body") {
              case "body":
                switch (r.responseType) {
                  case "arraybuffer":
                    return o.pipe(
                      D((t) => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return o.pipe(
                      D((t) => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return o.pipe(
                      D((t) => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return o.pipe(D((t) => t.body));
                }
              case "response":
                return o;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new uu().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, bu(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, bu(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, bu(n, e));
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(ou));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Cu {
        constructor(t, e) {
          (this.next = t), (this.interceptor = e);
        }
        handle(t) {
          return this.interceptor.intercept(t, this.next);
        }
      }
      const xu = new Dt("HTTP_INTERCEPTORS");
      let Su = (() => {
        class t {
          intercept(t, e) {
            return e.handle(t);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Ou = /^\)\]\}',?\n/;
      class ku {}
      let Eu = (() => {
          class t {
            constructor() {}
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Pu = (() => {
          class t {
            constructor(t) {
              this.xhrFactory = t;
            }
            handle(t) {
              if ("JSONP" === t.method)
                throw new Error(
                  "Attempted to construct Jsonp request without JsonpClientModule installed."
                );
              return new b((e) => {
                const n = this.xhrFactory.build();
                if (
                  (n.open(t.method, t.urlWithParams),
                  t.withCredentials && (n.withCredentials = !0),
                  t.headers.forEach((t, e) =>
                    n.setRequestHeader(t, e.join(","))
                  ),
                  t.headers.has("Accept") ||
                    n.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !t.headers.has("Content-Type"))
                ) {
                  const e = t.detectContentTypeHeader();
                  null !== e && n.setRequestHeader("Content-Type", e);
                }
                if (t.responseType) {
                  const e = t.responseType.toLowerCase();
                  n.responseType = "json" !== e ? e : "text";
                }
                const r = t.serializeBody();
                let s = null;
                const o = () => {
                    if (null !== s) return s;
                    const e = 1223 === n.status ? 204 : n.status,
                      r = n.statusText || "OK",
                      o = new au(n.getAllResponseHeaders()),
                      i =
                        (function (t) {
                          return "responseURL" in t && t.responseURL
                            ? t.responseURL
                            : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
                            ? t.getResponseHeader("X-Request-URL")
                            : null;
                        })(n) || t.url;
                    return (
                      (s = new yu({
                        headers: o,
                        status: e,
                        statusText: r,
                        url: i,
                      })),
                      s
                    );
                  },
                  i = () => {
                    let { headers: r, status: s, statusText: i, url: a } = o(),
                      l = null;
                    204 !== s &&
                      (l = void 0 === n.response ? n.responseText : n.response),
                      0 === s && (s = l ? 200 : 0);
                    let c = s >= 200 && s < 300;
                    if ("json" === t.responseType && "string" == typeof l) {
                      const t = l;
                      l = l.replace(Ou, "");
                      try {
                        l = "" !== l ? JSON.parse(l) : null;
                      } catch (u) {
                        (l = t), c && ((c = !1), (l = { error: u, text: l }));
                      }
                    }
                    c
                      ? (e.next(
                          new _u({
                            body: l,
                            headers: r,
                            status: s,
                            statusText: i,
                            url: a || void 0,
                          })
                        ),
                        e.complete())
                      : e.error(
                          new vu({
                            error: l,
                            headers: r,
                            status: s,
                            statusText: i,
                            url: a || void 0,
                          })
                        );
                  },
                  a = (t) => {
                    const { url: r } = o(),
                      s = new vu({
                        error: t,
                        status: n.status || 0,
                        statusText: n.statusText || "Unknown Error",
                        url: r || void 0,
                      });
                    e.error(s);
                  };
                let l = !1;
                const c = (r) => {
                    l || (e.next(o()), (l = !0));
                    let s = { type: gu.DownloadProgress, loaded: r.loaded };
                    r.lengthComputable && (s.total = r.total),
                      "text" === t.responseType &&
                        n.responseText &&
                        (s.partialText = n.responseText),
                      e.next(s);
                  },
                  u = (t) => {
                    let n = { type: gu.UploadProgress, loaded: t.loaded };
                    t.lengthComputable && (n.total = t.total), e.next(n);
                  };
                return (
                  n.addEventListener("load", i),
                  n.addEventListener("error", a),
                  t.reportProgress &&
                    (n.addEventListener("progress", c),
                    null !== r &&
                      n.upload &&
                      n.upload.addEventListener("progress", u)),
                  n.send(r),
                  e.next({ type: gu.Sent }),
                  () => {
                    n.removeEventListener("error", a),
                      n.removeEventListener("load", i),
                      t.reportProgress &&
                        (n.removeEventListener("progress", c),
                        null !== r &&
                          n.upload &&
                          n.upload.removeEventListener("progress", u)),
                      n.abort();
                  }
                );
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(ku));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Tu = new Dt("XSRF_COOKIE_NAME"),
        Au = new Dt("XSRF_HEADER_NAME");
      class Mu {}
      let Ru = (() => {
          class t {
            constructor(t, e, n) {
              (this.doc = t),
                (this.platform = e),
                (this.cookieName = n),
                (this.lastCookieString = ""),
                (this.lastToken = null),
                (this.parseCount = 0);
            }
            getToken() {
              if ("server" === this.platform) return null;
              const t = this.doc.cookie || "";
              return (
                t !== this.lastCookieString &&
                  (this.parseCount++,
                  (this.lastToken = gc(t, this.cookieName)),
                  (this.lastCookieString = t)),
                this.lastToken
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Zl), Wt(tl), Wt(Tu));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Iu = (() => {
          class t {
            constructor(t, e) {
              (this.tokenService = t), (this.headerName = e);
            }
            intercept(t, e) {
              const n = t.url.toLowerCase();
              if (
                "GET" === t.method ||
                "HEAD" === t.method ||
                n.startsWith("http://") ||
                n.startsWith("https://")
              )
                return e.handle(t);
              const r = this.tokenService.getToken();
              return (
                null === r ||
                  t.headers.has(this.headerName) ||
                  (t = t.clone({ headers: t.headers.set(this.headerName, r) })),
                e.handle(t)
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Mu), Wt(Au));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Nu = (() => {
          class t {
            constructor(t, e) {
              (this.backend = t), (this.injector = e), (this.chain = null);
            }
            handle(t) {
              if (null === this.chain) {
                const t = this.injector.get(xu, []);
                this.chain = t.reduceRight(
                  (t, e) => new Cu(t, e),
                  this.backend
                );
              }
              return this.chain.handle(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(iu), Wt(yo));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vu = (() => {
          class t {
            static disable() {
              return {
                ngModule: t,
                providers: [{ provide: Iu, useClass: Su }],
              };
            }
            static withOptions(e = {}) {
              return {
                ngModule: t,
                providers: [
                  e.cookieName ? { provide: Tu, useValue: e.cookieName } : [],
                  e.headerName ? { provide: Au, useValue: e.headerName } : [],
                ],
              };
            }
          }
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                Iu,
                { provide: xu, useExisting: Iu, multi: !0 },
                { provide: Mu, useClass: Ru },
                { provide: Tu, useValue: "XSRF-TOKEN" },
                { provide: Au, useValue: "X-XSRF-TOKEN" },
              ],
            })),
            t
          );
        })(),
        ju = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [
                wu,
                { provide: ou, useClass: Nu },
                Pu,
                { provide: iu, useExisting: Pu },
                Eu,
                { provide: ku, useExisting: Eu },
              ],
              imports: [
                [
                  Vu.withOptions({
                    cookieName: "XSRF-TOKEN",
                    headerName: "X-XSRF-TOKEN",
                  }),
                ],
              ],
            })),
            t
          );
        })();
      function Du(t, e) {
        return new b((n) => {
          const r = t.length;
          if (0 === r) return void n.complete();
          const s = new Array(r);
          let o = 0,
            i = 0;
          for (let a = 0; a < r; a++) {
            const l = H(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: (t) => {
                  c || ((c = !0), i++), (s[a] = t);
                },
                error: (t) => n.error(t),
                complete: () => {
                  o++,
                    (o !== r && c) ||
                      (i === r &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = s[n]), t), {}) : s
                        ),
                      n.complete());
                },
              })
            );
          }
        });
      }
      const Uu = new Dt("NgValueAccessor"),
        Fu = { provide: Uu, useExisting: Ct(() => Lu), multi: !0 };
      let Lu = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(qi), Io(Li));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                qo("change", function (t) {
                  return e.onChange(t.target.checked);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ji([Fu])],
          })),
          t
        );
      })();
      const Hu = { provide: Uu, useExisting: Ct(() => $u), multi: !0 },
        zu = new Dt("CompositionEventMode");
      let $u = (() => {
          class t {
            constructor(t, e, n) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._compositionMode = n),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._composing = !1),
                null == this._compositionMode &&
                  (this._compositionMode = !(function () {
                    const t = Wl() ? Wl().getUserAgent() : "";
                    return /android (\d+)/.test(t.toLowerCase());
                  })());
            }
            writeValue(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                null == t ? "" : t
              );
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _handleInput(t) {
              (!this._compositionMode ||
                (this._compositionMode && !this._composing)) &&
                this.onChange(t);
            }
            _compositionStart() {
              this._composing = !0;
            }
            _compositionEnd(t) {
              (this._composing = !1), this._compositionMode && this.onChange(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(qi), Io(Li), Io(zu, 8));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["input", "formControlName", "", 3, "type", "checkbox"],
                ["textarea", "formControlName", ""],
                ["input", "formControl", "", 3, "type", "checkbox"],
                ["textarea", "formControl", ""],
                ["input", "ngModel", "", 3, "type", "checkbox"],
                ["textarea", "ngModel", ""],
                ["", "ngDefaultControl", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("input", function (t) {
                    return e._handleInput(t.target.value);
                  })("blur", function () {
                    return e.onTouched();
                  })("compositionstart", function () {
                    return e._compositionStart();
                  })("compositionend", function (t) {
                    return e._compositionEnd(t.target.value);
                  });
              },
              features: [ji([Hu])],
            })),
            t
          );
        })(),
        qu = (() => {
          class t {
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = ye({ type: t })),
            t
          );
        })(),
        Bu = (() => {
          class t extends qu {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return Gu(e || t);
            }),
            (t.ɵdir = ye({ type: t, features: [bi] })),
            t
          );
        })();
      const Gu = Yn(Bu);
      function Wu() {
        throw new Error("unimplemented");
      }
      class Zu extends qu {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null),
            (this._rawValidators = []),
            (this._rawAsyncValidators = []);
        }
        get validator() {
          return Wu();
        }
        get asyncValidator() {
          return Wu();
        }
      }
      class Qu {
        constructor(t) {
          this._cd = t;
        }
        get ngClassUntouched() {
          return !!this._cd.control && this._cd.control.untouched;
        }
        get ngClassTouched() {
          return !!this._cd.control && this._cd.control.touched;
        }
        get ngClassPristine() {
          return !!this._cd.control && this._cd.control.pristine;
        }
        get ngClassDirty() {
          return !!this._cd.control && this._cd.control.dirty;
        }
        get ngClassValid() {
          return !!this._cd.control && this._cd.control.valid;
        }
        get ngClassInvalid() {
          return !!this._cd.control && this._cd.control.invalid;
        }
        get ngClassPending() {
          return !!this._cd.control && this._cd.control.pending;
        }
      }
      let Ku = (() => {
          class t extends Qu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Zu, 2));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  ri("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [bi],
            })),
            t
          );
        })(),
        Ju = (() => {
          class t extends Qu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Bu, 2));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""],
              ],
              hostVars: 14,
              hostBindings: function (t, e) {
                2 & t &&
                  ri("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [bi],
            })),
            t
          );
        })();
      function Yu(t) {
        return null == t || 0 === t.length;
      }
      const Xu = new Dt("NgValidators"),
        th = new Dt("NgAsyncValidators"),
        eh =
          /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class nh {
        static min(t) {
          return (e) => {
            if (Yu(e.value) || Yu(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return (e) => {
            if (Yu(e.value) || Yu(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Yu(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Yu(t.value) || eh.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return (e) => {
            if (Yu(e.value)) return null;
            const n = e.value ? e.value.length : 0;
            return n < t
              ? { minlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static maxLength(t) {
          return (e) => {
            const n = e.value ? e.value.length : 0;
            return n > t
              ? { maxlength: { requiredLength: t, actualLength: n } }
              : null;
          };
        }
        static pattern(t) {
          if (!t) return nh.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            (t) => {
              if (Yu(t.value)) return null;
              const r = t.value;
              return e.test(r)
                ? null
                : { pattern: { requiredPattern: n, actualValue: r } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(rh);
          return 0 == e.length
            ? null
            : function (t) {
                return oh(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e)
                );
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(rh);
          return 0 == e.length
            ? null
            : function (t) {
                return (function (...t) {
                  if (1 === t.length) {
                    const e = t[0];
                    if (l(e)) return Du(e, null);
                    if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
                      const t = Object.keys(e);
                      return Du(
                        t.map((t) => e[t]),
                        t
                      );
                    }
                  }
                  if ("function" == typeof t[t.length - 1]) {
                    const e = t.pop();
                    return Du(
                      (t = 1 === t.length && l(t[0]) ? t[0] : t),
                      null
                    ).pipe(D((t) => e(...t)));
                  }
                  return Du(t, null);
                })(
                  (function (t, e) {
                    return e.map((e) => e(t));
                  })(t, e).map(sh)
                ).pipe(D(oh));
              };
        }
      }
      function rh(t) {
        return null != t;
      }
      function sh(t) {
        const e = zo(t) ? H(t) : t;
        if (!$o(e))
          throw new Error(
            "Expected validator to return Promise or Observable."
          );
        return e;
      }
      function oh(t) {
        let e = {};
        return (
          t.forEach((t) => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function ih(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      function ah(t) {
        return t.validate ? (e) => t.validate(e) : t;
      }
      const lh = { provide: Uu, useExisting: Ct(() => ch), multi: !0 };
      let ch = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(qi), Io(Li));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                qo("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ji([lh])],
          })),
          t
        );
      })();
      const uh = { provide: Uu, useExisting: Ct(() => dh), multi: !0 };
      let hh = (() => {
          class t {
            constructor() {
              this._accessors = [];
            }
            add(t, e) {
              this._accessors.push([t, e]);
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }
            select(t) {
              this._accessors.forEach((e) => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value);
              });
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        dh = (() => {
          class t {
            constructor(t, e, n, r) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = r),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(Zu)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              this.name &&
                this.formControlName &&
                this.name !== this.formControlName &&
                this._throwNameError(),
                !this.name &&
                  this.formControlName &&
                  (this.name = this.formControlName);
            }
            _throwNameError() {
              throw new Error(
                '\n      If you define both a name and a formControlName attribute on your radio button, their values\n      must match. Ex: <input type="radio" formControlName="food" name="food">\n    '
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(qi), Io(Li), Io(hh), Io(yo));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("change", function () {
                    return e.onChange();
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value",
              },
              features: [ji([uh])],
            })),
            t
          );
        })();
      const ph = { provide: Uu, useExisting: Ct(() => fh), multi: !0 };
      let fh = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = (t) => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t)
            );
          }
          registerOnChange(t) {
            this.onChange = (e) => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(qi), Io(Li));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""],
            ],
            hostBindings: function (t, e) {
              1 & t &&
                qo("change", function (t) {
                  return e.onChange(t.target.value);
                })("input", function (t) {
                  return e.onChange(t.target.value);
                })("blur", function () {
                  return e.onTouched();
                });
            },
            features: [ji([ph])],
          })),
          t
        );
      })();
      const gh =
          '\n    <div [formGroup]="myGroup">\n       <div formGroupName="person">\n          <input formControlName="firstName">\n       </div>\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       person: new FormGroup({ firstName: new FormControl() })\n    });',
        mh =
          '\n    <form>\n       <div ngModelGroup="person">\n          <input [(ngModel)]="person.name" name="firstName">\n       </div>\n    </form>',
        yh = { provide: Uu, useExisting: Ct(() => vh), multi: !0 };
      function _h(t, e) {
        return null == t
          ? "" + e
          : (e && "object" == typeof e && (e = "Object"),
            `${t}: ${e}`.slice(0, 50));
      }
      let vh = (() => {
          class t {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Oo);
            }
            set compareWith(t) {
              if ("function" != typeof t)
                throw new Error(
                  "compareWith must be a function, but received " +
                    JSON.stringify(t)
                );
              this._compareWith = t;
            }
            writeValue(t) {
              this.value = t;
              const e = this._getOptionId(t);
              null == e &&
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "selectedIndex",
                  -1
                );
              const n = _h(e, t);
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "value",
                n
              );
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                (this.value = this._getOptionValue(e)), t(this.value);
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _registerOption() {
              return (this._idCounter++).toString();
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e), t)) return e;
              return null;
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e) : t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(qi), Io(Li));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["select", "formControlName", "", 3, "multiple", ""],
                ["select", "formControl", "", 3, "multiple", ""],
                ["select", "ngModel", "", 3, "multiple", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("change", function (t) {
                    return e.onChange(t.target.value);
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [ji([yh])],
            })),
            t
          );
        })(),
        bh = (() => {
          class t {
            constructor(t, e, n) {
              (this._element = t),
                (this._renderer = e),
                (this._select = n),
                this._select && (this.id = this._select._registerOption());
            }
            set ngValue(t) {
              null != this._select &&
                (this._select._optionMap.set(this.id, t),
                this._setElementValue(_h(this.id, t)),
                this._select.writeValue(this._select.value));
            }
            set value(t) {
              this._setElementValue(t),
                this._select && this._select.writeValue(this._select.value);
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                t
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Li), Io(qi), Io(vh, 9));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            t
          );
        })();
      const wh = { provide: Uu, useExisting: Ct(() => xh), multi: !0 };
      function Ch(t, e) {
        return null == t
          ? "" + e
          : ("string" == typeof e && (e = `'${e}'`),
            e && "object" == typeof e && (e = "Object"),
            `${t}: ${e}`.slice(0, 50));
      }
      let xh = (() => {
          class t {
            constructor(t, e) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._optionMap = new Map()),
                (this._idCounter = 0),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this._compareWith = Oo);
            }
            set compareWith(t) {
              if ("function" != typeof t)
                throw new Error(
                  "compareWith must be a function, but received " +
                    JSON.stringify(t)
                );
              this._compareWith = t;
            }
            writeValue(t) {
              let e;
              if (((this.value = t), Array.isArray(t))) {
                const n = t.map((t) => this._getOptionId(t));
                e = (t, e) => {
                  t._setSelected(n.indexOf(e.toString()) > -1);
                };
              } else
                e = (t, e) => {
                  t._setSelected(!1);
                };
              this._optionMap.forEach(e);
            }
            registerOnChange(t) {
              this.onChange = (e) => {
                const n = [];
                if (e.hasOwnProperty("selectedOptions")) {
                  const t = e.selectedOptions;
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e),
                      s = this._getOptionValue(r.value);
                    n.push(s);
                  }
                } else {
                  const t = e.options;
                  for (let e = 0; e < t.length; e++) {
                    const r = t.item(e);
                    if (r.selected) {
                      const t = this._getOptionValue(r.value);
                      n.push(t);
                    }
                  }
                }
                (this.value = n), t(n);
              };
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _registerOption(t) {
              const e = (this._idCounter++).toString();
              return this._optionMap.set(e, t), e;
            }
            _getOptionId(t) {
              for (const e of Array.from(this._optionMap.keys()))
                if (this._compareWith(this._optionMap.get(e)._value, t))
                  return e;
              return null;
            }
            _getOptionValue(t) {
              const e = (function (t) {
                return t.split(":")[0];
              })(t);
              return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(qi), Io(Li));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["select", "multiple", "", "formControlName", ""],
                ["select", "multiple", "", "formControl", ""],
                ["select", "multiple", "", "ngModel", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("change", function (t) {
                    return e.onChange(t.target);
                  })("blur", function () {
                    return e.onTouched();
                  });
              },
              inputs: { compareWith: "compareWith" },
              features: [ji([wh])],
            })),
            t
          );
        })(),
        Sh = (() => {
          class t {
            constructor(t, e, n) {
              (this._element = t),
                (this._renderer = e),
                (this._select = n),
                this._select && (this.id = this._select._registerOption(this));
            }
            set ngValue(t) {
              null != this._select &&
                ((this._value = t),
                this._setElementValue(Ch(this.id, t)),
                this._select.writeValue(this._select.value));
            }
            set value(t) {
              this._select
                ? ((this._value = t),
                  this._setElementValue(Ch(this.id, t)),
                  this._select.writeValue(this._select.value))
                : this._setElementValue(t);
            }
            _setElementValue(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "value",
                t
              );
            }
            _setSelected(t) {
              this._renderer.setProperty(
                this._element.nativeElement,
                "selected",
                t
              );
            }
            ngOnDestroy() {
              this._select &&
                (this._select._optionMap.delete(this.id),
                this._select.writeValue(this._select.value));
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Li), Io(qi), Io(xh, 9));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [["option"]],
              inputs: { ngValue: "ngValue", value: "value" },
            })),
            t
          );
        })();
      function Oh(t, e) {
        return [...e.path, t];
      }
      function kh(t, e) {
        t || Ph(e, "Cannot find control with"),
          e.valueAccessor || Ph(e, "No value accessor for form control with"),
          (t.validator = nh.compose([t.validator, e.validator])),
          (t.asyncValidator = nh.composeAsync([
            t.asyncValidator,
            e.asyncValidator,
          ])),
          e.valueAccessor.writeValue(t.value),
          (function (t, e) {
            e.valueAccessor.registerOnChange((n) => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && Eh(t, e);
            });
          })(t, e),
          (function (t, e) {
            t.registerOnChange((t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            });
          })(t, e),
          (function (t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && Eh(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          e.valueAccessor.setDisabledState &&
            t.registerOnDisabledChange((t) => {
              e.valueAccessor.setDisabledState(t);
            }),
          e._rawValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          }),
          e._rawAsyncValidators.forEach((e) => {
            e.registerOnValidatorChange &&
              e.registerOnValidatorChange(() => t.updateValueAndValidity());
          });
      }
      function Eh(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Ph(t, e) {
        let n;
        throw (
          ((n =
            t.path.length > 1
              ? `path: '${t.path.join(" -> ")}'`
              : t.path[0]
              ? `name: '${t.path}'`
              : "unspecified name attribute"),
          new Error(`${e} ${n}`))
        );
      }
      function Th(t) {
        return null != t ? nh.compose(t.map(ih)) : null;
      }
      function Ah(t) {
        return null != t ? nh.composeAsync(t.map(ah)) : null;
      }
      const Mh = [Lu, fh, ch, vh, xh, dh];
      function Rh(t) {
        const e = Nh(t) ? t.validators : t;
        return Array.isArray(e) ? Th(e) : e || null;
      }
      function Ih(t, e) {
        const n = Nh(e) ? e.asyncValidators : t;
        return Array.isArray(n) ? Ah(n) : n || null;
      }
      function Nh(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class Vh {
        constructor(t, e) {
          (this.validator = t),
            (this.asyncValidator = e),
            (this._onCollectionChange = () => {}),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []);
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return "VALID" === this.status;
        }
        get invalid() {
          return "INVALID" === this.status;
        }
        get pending() {
          return "PENDING" == this.status;
        }
        get disabled() {
          return "DISABLED" === this.status;
        }
        get enabled() {
          return "DISABLED" !== this.status;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          this.validator = Rh(t);
        }
        setAsyncValidators(t) {
          this.asyncValidator = Ih(t);
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild((t) => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild((t) => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild((t) => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = "PENDING"),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "DISABLED"),
            (this.errors = null),
            this._forEachChild((e) => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = "VALID"),
            this._forEachChild((e) => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach((t) => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              ("VALID" !== this.status && "PENDING" !== this.status) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild((e) => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent,
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? "DISABLED" : "VALID";
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            this.status = "PENDING";
            const e = sh(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe((e) =>
              this.setErrors(e, { emitEvent: t })
            );
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            this._asyncValidationSubscription.unsubscribe();
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function (t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let r = t;
            return (
              e.forEach((t) => {
                r =
                  r instanceof Dh
                    ? r.controls.hasOwnProperty(t)
                      ? r.controls[t]
                      : null
                    : (r instanceof Uh && r.at(t)) || null;
              }),
              r
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Aa()), (this.statusChanges = new Aa());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? "DISABLED"
            : this.errors
            ? "INVALID"
            : this._anyControlsHaveStatus("PENDING")
            ? "PENDING"
            : this._anyControlsHaveStatus("INVALID")
            ? "INVALID"
            : "VALID";
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls((e) => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls((t) => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls((t) => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Nh(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            this._parent &&
            this._parent.dirty &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class jh extends Vh {
        constructor(t = null, e, n) {
          super(Rh(e), Ih(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 }),
            this._initObservables();
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach((t) =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _clearChangeFns() {
          (this._onChange = []),
            (this._onDisabledChange = []),
            (this._onCollectionChange = () => {});
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1,
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class Dh extends Vh {
        constructor(t, e, n) {
          super(Rh(e), Ih(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach((n) => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach((n) => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof jh ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach((e) => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild((t) => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          let e = !1;
          return (
            this._forEachChild((n, r) => {
              e = e || (this.contains(r) && t(n));
            }),
            e
          );
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, r) => {
              n = e(n, t, r);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Uh extends Vh {
        constructor(t, e, n) {
          super(Rh(e), Ih(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !1 });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent,
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent,
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, r) => {
            n.reset(t[r], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map((t) =>
            t instanceof jh ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild((t) => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet.  If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error("Cannot find form control at index " + t);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter((t) => t.enabled || this.disabled)
            .map((t) => t.value);
        }
        _anyControls(t) {
          return this.controls.some((e) => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild((t) => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      const Fh = { provide: Bu, useExisting: Ct(() => Hh) },
        Lh = (() => Promise.resolve(null))();
      let Hh = (() => {
          class t extends Bu {
            constructor(t, e) {
              super(),
                (this.submitted = !1),
                (this._directives = []),
                (this.ngSubmit = new Aa()),
                (this.form = new Dh({}, Th(t), Ah(e)));
            }
            ngAfterViewInit() {
              this._setUpdateStrategy();
            }
            get formDirective() {
              return this;
            }
            get control() {
              return this.form;
            }
            get path() {
              return [];
            }
            get controls() {
              return this.form.controls;
            }
            addControl(t) {
              Lh.then(() => {
                const e = this._findContainer(t.path);
                (t.control = e.registerControl(t.name, t.control)),
                  kh(t.control, t),
                  t.control.updateValueAndValidity({ emitEvent: !1 }),
                  this._directives.push(t);
              });
            }
            getControl(t) {
              return this.form.get(t.path);
            }
            removeControl(t) {
              Lh.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name),
                  (function (t, e) {
                    const n = t.indexOf(e);
                    n > -1 && t.splice(n, 1);
                  })(this._directives, t);
              });
            }
            addFormGroup(t) {
              Lh.then(() => {
                const e = this._findContainer(t.path),
                  n = new Dh({});
                (function (t, e) {
                  null == t && Ph(e, "Cannot find control with"),
                    (t.validator = nh.compose([t.validator, e.validator])),
                    (t.asyncValidator = nh.composeAsync([
                      t.asyncValidator,
                      e.asyncValidator,
                    ]));
                })(n, t),
                  e.registerControl(t.name, n),
                  n.updateValueAndValidity({ emitEvent: !1 });
              });
            }
            removeFormGroup(t) {
              Lh.then(() => {
                const e = this._findContainer(t.path);
                e && e.removeControl(t.name);
              });
            }
            getFormGroup(t) {
              return this.form.get(t.path);
            }
            updateModel(t, e) {
              Lh.then(() => {
                this.form.get(t.path).setValue(e);
              });
            }
            setValue(t) {
              this.control.setValue(t);
            }
            onSubmit(t) {
              return (
                (this.submitted = !0),
                (e = this._directives),
                this.form._syncPendingControls(),
                e.forEach((t) => {
                  const e = t.control;
                  "submit" === e.updateOn &&
                    e._pendingChange &&
                    (t.viewToModelUpdate(e._pendingValue),
                    (e._pendingChange = !1));
                }),
                this.ngSubmit.emit(t),
                !1
              );
              var e;
            }
            onReset() {
              this.resetForm();
            }
            resetForm(t) {
              this.form.reset(t), (this.submitted = !1);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.form._updateOn = this.options.updateOn);
            }
            _findContainer(t) {
              return t.pop(), t.length ? this.form.get(t) : this.form;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Xu, 10), Io(th, 10));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
                ["ng-form"],
                ["", "ngForm", ""],
              ],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("submit", function (t) {
                    return e.onSubmit(t);
                  })("reset", function () {
                    return e.onReset();
                  });
              },
              inputs: { options: ["ngFormOptions", "options"] },
              outputs: { ngSubmit: "ngSubmit" },
              exportAs: ["ngForm"],
              features: [ji([Fh]), bi],
            })),
            t
          );
        })(),
        zh = (() => {
          class t extends Bu {
            ngOnInit() {
              this._checkParentType(), this.formDirective.addFormGroup(this);
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeFormGroup(this);
            }
            get control() {
              return this.formDirective.getFormGroup(this);
            }
            get path() {
              return Oh(
                null == this.name ? this.name : this.name.toString(),
                this._parent
              );
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Th(this._validators);
            }
            get asyncValidator() {
              return Ah(this._asyncValidators);
            }
            _checkParentType() {}
          }
          return (
            (t.ɵfac = function (e) {
              return $h(e || t);
            }),
            (t.ɵdir = ye({ type: t, features: [bi] })),
            t
          );
        })();
      const $h = Yn(zh);
      class qh {
        static modelParentException() {
          throw new Error(
            '\n      ngModel cannot be used to register form controls with a parent formGroup directive.  Try using\n      formGroup\'s partner directive "formControlName" instead.  Example:\n\n      \n    <div [formGroup]="myGroup">\n      <input formControlName="firstName">\n    </div>\n\n    In your class:\n\n    this.myGroup = new FormGroup({\n       firstName: new FormControl()\n    });\n\n      Or, if you\'d like to avoid registering this form control, indicate that it\'s standalone in ngModelOptions:\n\n      Example:\n\n      \n    <div [formGroup]="myGroup">\n       <input formControlName="firstName">\n       <input [(ngModel)]="showMoreControls" [ngModelOptions]="{standalone: true}">\n    </div>\n  '
          );
        }
        static formGroupNameException() {
          throw new Error(
            `\n      ngModel cannot be used to register form controls with a parent formGroupName or formArrayName directive.\n\n      Option 1: Use formControlName instead of ngModel (reactive strategy):\n\n      ${gh}\n\n      Option 2:  Update ngModel's parent be ngModelGroup (template-driven strategy):\n\n      ${mh}`
          );
        }
        static missingNameException() {
          throw new Error(
            'If ngModel is used within a form tag, either the name attribute must be set or the form\n      control must be defined as \'standalone\' in ngModelOptions.\n\n      Example 1: <input [(ngModel)]="person.firstName" name="first">\n      Example 2: <input [(ngModel)]="person.firstName" [ngModelOptions]="{standalone: true}">'
          );
        }
        static modelGroupParentException() {
          throw new Error(
            `\n      ngModelGroup cannot be used with a parent formGroup directive.\n\n      Option 1: Use formGroupName instead of ngModelGroup (reactive strategy):\n\n      ${gh}\n\n      Option 2:  Use a regular form tag instead of the formGroup directive (template-driven strategy):\n\n      ${mh}`
          );
        }
      }
      const Bh = { provide: Bu, useExisting: Ct(() => Gh) };
      let Gh = (() => {
        class t extends zh {
          constructor(t, e, n) {
            super(),
              (this._parent = t),
              (this._validators = e),
              (this._asyncValidators = n);
          }
          _checkParentType() {
            this._parent instanceof t ||
              this._parent instanceof Hh ||
              qh.modelGroupParentException();
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(Bu, 5), Io(Xu, 10), Io(th, 10));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [["", "ngModelGroup", ""]],
            inputs: { name: ["ngModelGroup", "name"] },
            exportAs: ["ngModelGroup"],
            features: [ji([Bh]), bi],
          })),
          t
        );
      })();
      const Wh = { provide: Zu, useExisting: Ct(() => Qh) },
        Zh = (() => Promise.resolve(null))();
      let Qh = (() => {
          class t extends Zu {
            constructor(t, e, n, r) {
              super(),
                (this.control = new jh()),
                (this._registered = !1),
                (this.update = new Aa()),
                (this._parent = t),
                (this._rawValidators = e || []),
                (this._rawAsyncValidators = n || []),
                (this.valueAccessor = (function (t, e) {
                  if (!e) return null;
                  Array.isArray(e) ||
                    Ph(
                      t,
                      "Value accessor was not provided as an array for form control with"
                    );
                  let n = void 0,
                    r = void 0,
                    s = void 0;
                  return (
                    e.forEach((e) => {
                      var o;
                      e.constructor === $u
                        ? (n = e)
                        : ((o = e),
                          Mh.some((t) => o.constructor === t)
                            ? (r &&
                                Ph(
                                  t,
                                  "More than one built-in value accessor matches form control with"
                                ),
                              (r = e))
                            : (s &&
                                Ph(
                                  t,
                                  "More than one custom value accessor matches form control with"
                                ),
                              (s = e)));
                    }),
                    s ||
                      r ||
                      n ||
                      (Ph(t, "No valid value accessor for form control with"),
                      null)
                  );
                })(this, r));
            }
            ngOnChanges(t) {
              this._checkForErrors(),
                this._registered || this._setUpControl(),
                "isDisabled" in t && this._updateDisabled(t),
                (function (t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  const n = t.model;
                  return !!n.isFirstChange() || !Oo(e, n.currentValue);
                })(t, this.viewModel) &&
                  (this._updateValue(this.model),
                  (this.viewModel = this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            get path() {
              return this._parent ? Oh(this.name, this._parent) : [this.name];
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            get validator() {
              return Th(this._rawValidators);
            }
            get asyncValidator() {
              return Ah(this._rawAsyncValidators);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            _setUpControl() {
              this._setUpdateStrategy(),
                this._isStandalone()
                  ? this._setUpStandalone()
                  : this.formDirective.addControl(this),
                (this._registered = !0);
            }
            _setUpdateStrategy() {
              this.options &&
                null != this.options.updateOn &&
                (this.control._updateOn = this.options.updateOn);
            }
            _isStandalone() {
              return (
                !this._parent || !(!this.options || !this.options.standalone)
              );
            }
            _setUpStandalone() {
              kh(this.control, this),
                this.control.updateValueAndValidity({ emitEvent: !1 });
            }
            _checkForErrors() {
              this._isStandalone() || this._checkParentType(),
                this._checkName();
            }
            _checkParentType() {
              !(this._parent instanceof Gh) && this._parent instanceof zh
                ? qh.formGroupNameException()
                : this._parent instanceof Gh ||
                  this._parent instanceof Hh ||
                  qh.modelParentException();
            }
            _checkName() {
              this.options &&
                this.options.name &&
                (this.name = this.options.name),
                this._isStandalone() || this.name || qh.missingNameException();
            }
            _updateValue(t) {
              Zh.then(() => {
                this.control.setValue(t, { emitViewToModelChange: !1 });
              });
            }
            _updateDisabled(t) {
              const e = t.isDisabled.currentValue,
                n = "" === e || (e && "false" !== e);
              Zh.then(() => {
                n && !this.control.disabled
                  ? this.control.disable()
                  : !n && this.control.disabled && this.control.enable();
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Io(Bu, 9),
                Io(Xu, 10),
                Io(th, 10),
                Io(Uu, 10)
              );
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                [
                  "",
                  "ngModel",
                  "",
                  3,
                  "formControlName",
                  "",
                  3,
                  "formControl",
                  "",
                ],
              ],
              inputs: {
                name: "name",
                isDisabled: ["disabled", "isDisabled"],
                model: ["ngModel", "model"],
                options: ["ngModelOptions", "options"],
              },
              outputs: { update: "ngModelChange" },
              exportAs: ["ngModel"],
              features: [ji([Wh]), bi, ki],
            })),
            t
          );
        })(),
        Kh = (() => {
          class t {}
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""],
              ],
              hostAttrs: ["novalidate", ""],
            })),
            t
          );
        })();
      const Jh = { provide: Xu, useExisting: Ct(() => Yh), multi: !0 };
      let Yh = (() => {
          class t {
            get required() {
              return this._required;
            }
            set required(t) {
              (this._required = null != t && !1 !== t && "" + t != "false"),
                this._onChange && this._onChange();
            }
            validate(t) {
              return this.required ? nh.required(t) : null;
            }
            registerOnValidatorChange(t) {
              this._onChange = t;
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                [
                  "",
                  "required",
                  "",
                  "formControlName",
                  "",
                  3,
                  "type",
                  "checkbox",
                ],
                ["", "required", "", "formControl", "", 3, "type", "checkbox"],
                ["", "required", "", "ngModel", "", 3, "type", "checkbox"],
              ],
              hostVars: 1,
              hostBindings: function (t, e) {
                2 & t && To("required", e.required ? "" : null);
              },
              inputs: { required: "required" },
              features: [ji([Jh])],
            })),
            t
          );
        })(),
        Xh = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        td = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [hh],
              imports: [Xh],
            })),
            t
          );
        })();
      class ed extends O {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const e = super._subscribe(t);
          return e && !e.closed && t.next(this._value), e;
        }
        getValue() {
          if (this.hasError) throw this.thrownError;
          if (this.closed) throw new C();
          return this._value;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      const nd = {};
      class rd {
        constructor(t) {
          this.resultSelector = t;
        }
        call(t, e) {
          return e.subscribe(new sd(t, this.resultSelector));
        }
      }
      class sd extends j {
        constructor(t, e) {
          super(t),
            (this.resultSelector = e),
            (this.active = 0),
            (this.values = []),
            (this.observables = []);
        }
        _next(t) {
          this.values.push(nd), this.observables.push(t);
        }
        _complete() {
          const t = this.observables,
            e = t.length;
          if (0 === e) this.destination.complete();
          else {
            (this.active = e), (this.toRespond = e);
            for (let n = 0; n < e; n++) {
              const e = t[n];
              this.add(V(this, e, e, n));
            }
          }
        }
        notifyComplete(t) {
          0 == (this.active -= 1) && this.destination.complete();
        }
        notifyNext(t, e, n, r, s) {
          const o = this.values,
            i = this.toRespond
              ? o[n] === nd
                ? --this.toRespond
                : this.toRespond
              : 0;
          (o[n] = e),
            0 === i &&
              (this.resultSelector
                ? this._tryResultSelector(o)
                : this.destination.next(o.slice()));
        }
        _tryResultSelector(t) {
          let e;
          try {
            e = this.resultSelector.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      function od() {}
      function id(t, e, n, s) {
        return (
          r(n) && ((s = n), (n = void 0)),
          s
            ? id(t, e, n).pipe(D((t) => (l(t) ? s(...t) : s(t))))
            : new b((r) => {
                !(function t(e, n, r, s, o) {
                  let i;
                  if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addEventListener &&
                        "function" == typeof t.removeEventListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addEventListener(n, r, o),
                      (i = () => t.removeEventListener(n, r, o));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.on &&
                        "function" == typeof t.off
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.on(n, r), (i = () => t.off(n, r));
                  } else if (
                    (function (t) {
                      return (
                        t &&
                        "function" == typeof t.addListener &&
                        "function" == typeof t.removeListener
                      );
                    })(e)
                  ) {
                    const t = e;
                    e.addListener(n, r), (i = () => t.removeListener(n, r));
                  } else {
                    if (!e || !e.length)
                      throw new TypeError("Invalid event target");
                    for (let i = 0, a = e.length; i < a; i++)
                      t(e[i], n, r, s, o);
                  }
                  s.add(i);
                })(
                  t,
                  e,
                  function (t) {
                    r.next(
                      arguments.length > 1
                        ? Array.prototype.slice.call(arguments)
                        : t
                    );
                  },
                  r,
                  n
                );
              })
        );
      }
      function ad() {
        return B(1);
      }
      function ld(...t) {
        return ad()(tu(...t));
      }
      function cd(t, e) {
        return "function" == typeof e
          ? (n) =>
              n.pipe(cd((n, r) => H(t(n, r)).pipe(D((t, s) => e(n, t, r, s)))))
          : (e) => e.lift(new ud(t));
      }
      class ud {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new hd(t, this.project));
        }
      }
      class hd extends j {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (r) {
            return void this.destination.error(r);
          }
          this._innerSub(e, t, n);
        }
        _innerSub(t, e, n) {
          const r = this.innerSubscription;
          r && r.unsubscribe();
          const s = new P(this, e, n),
            o = this.destination;
          o.add(s),
            (this.innerSubscription = V(this, t, void 0, void 0, s)),
            this.innerSubscription !== s && o.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = null;
        }
        notifyComplete(t) {
          this.destination.remove(t),
            (this.innerSubscription = null),
            this.isStopped && super._complete();
        }
        notifyNext(t, e, n, r, s) {
          this.destination.next(e);
        }
      }
      function dd(t) {
        return (e) => e.lift(new pd(t));
      }
      class pd {
        constructor(t) {
          this.notifier = t;
        }
        call(t, e) {
          const n = new fd(t),
            r = V(n, this.notifier);
          return r && !n.seenValue ? (n.add(r), e.subscribe(n)) : n;
        }
      }
      class fd extends j {
        constructor(t) {
          super(t), (this.seenValue = !1);
        }
        notifyNext(t, e, n, r, s) {
          (this.seenValue = !0), this.complete();
        }
        notifyComplete() {}
      }
      const gd = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "argument out of range"),
              (this.name = "ArgumentOutOfRangeError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        md = new b((t) => t.complete());
      function yd(t) {
        return t
          ? (function (t) {
              return new b((e) => t.schedule(() => e.complete()));
            })(t)
          : md;
      }
      function _d(t) {
        return (e) => (0 === t ? yd() : e.lift(new vd(t)));
      }
      class vd {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new gd();
        }
        call(t, e) {
          return e.subscribe(new bd(t, this.total));
        }
      }
      class bd extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function wd(t, e, n) {
        return function (r) {
          return r.lift(new Cd(t, e, n));
        };
      }
      class Cd {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new xd(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class xd extends f {
        constructor(t, e, n, s) {
          super(t),
            (this._tapNext = od),
            (this._tapError = od),
            (this._tapComplete = od),
            (this._tapError = n || od),
            (this._tapComplete = s || od),
            r(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || od),
                (this._tapError = e.error || od),
                (this._tapComplete = e.complete || od));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      function Sd(...t) {
        return (e) => {
          let n;
          return (
            "function" == typeof t[t.length - 1] && (n = t.pop()),
            e.lift(new Od(t, n))
          );
        };
      }
      class Od {
        constructor(t, e) {
          (this.observables = t), (this.project = e);
        }
        call(t, e) {
          return e.subscribe(new kd(t, this.observables, this.project));
        }
      }
      class kd extends j {
        constructor(t, e, n) {
          super(t),
            (this.observables = e),
            (this.project = n),
            (this.toRespond = []);
          const r = e.length;
          this.values = new Array(r);
          for (let s = 0; s < r; s++) this.toRespond.push(s);
          for (let s = 0; s < r; s++) {
            let t = e[s];
            this.add(V(this, t, t, s));
          }
        }
        notifyNext(t, e, n, r, s) {
          this.values[n] = e;
          const o = this.toRespond;
          if (o.length > 0) {
            const t = o.indexOf(n);
            -1 !== t && o.splice(t, 1);
          }
        }
        notifyComplete() {}
        _next(t) {
          if (0 === this.toRespond.length) {
            const e = [t, ...this.values];
            this.project ? this._tryProject(e) : this.destination.next(e);
          }
        }
        _tryProject(t) {
          let e;
          try {
            e = this.project.apply(this, t);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      $localize`:@@ngb.alert.close␟f4e529ae5ffd73001d1ff4bbdeeb0a72e342e5c8␟7819314041543176992:Close`;
      const Ed = ["*"];
      $localize`:@@ngb.carousel.previous␟680d5c75b7fd8d37961083608b9fcdc4167b4c43␟4452427314943113135:Previous`,
        $localize`:@@ngb.carousel.next␟f732c304c7433e5a83ffcd862c3dce709a0f4982␟3885497195825665706:Next`,
        $localize`:@@ngb.datepicker.previous-month␟c3b08b07b5ab98e7cdcf18df39355690ab7d3884␟8586908745456864217:Previous month`,
        $localize`:@@ngb.datepicker.previous-month␟c3b08b07b5ab98e7cdcf18df39355690ab7d3884␟8586908745456864217:Previous month`,
        $localize`:@@ngb.datepicker.next-month␟4bd046985cfe13040d5ef0cd881edce0968a111a␟3628374603023447227:Next month`,
        $localize`:@@ngb.datepicker.next-month␟4bd046985cfe13040d5ef0cd881edce0968a111a␟3628374603023447227:Next month`,
        $localize`:@@ngb.datepicker.select-month␟1dbc84807f35518112f62e5775d1daebd3d8462b␟2253869508135064750:Select month`,
        $localize`:@@ngb.datepicker.select-month␟1dbc84807f35518112f62e5775d1daebd3d8462b␟2253869508135064750:Select month`,
        $localize`:@@ngb.datepicker.select-year␟8ceb09d002bf0c5d1cac171dfbffe1805d2b3962␟8852264961585484321:Select year`,
        $localize`:@@ngb.datepicker.select-year␟8ceb09d002bf0c5d1cac171dfbffe1805d2b3962␟8852264961585484321:Select year`;
      const Pd = ["dialog"];
      function Td(t, e) {
        1 & t && gi(0), 2 & t && mi(100 === e.fill ? "\u2605" : "\u2606");
      }
      function Ad(t, e) {}
      function Md(t, e) {
        if (1 & t) {
          const t = Ho();
          Uo(0, "span", 2),
            gi(1),
            Fo(),
            Uo(2, "span", 3),
            qo("mouseenter", function () {
              Ge(t);
              const n = e.index;
              return Wo().enter(n + 1);
            })("click", function () {
              Ge(t);
              const n = e.index;
              return Wo().handleClick(n + 1);
            }),
            Mo(3, Ad, 0, 0, "ng-template", 4),
            Fo();
        }
        if (2 & t) {
          const t = e.index,
            n = Wo(),
            r = Ro(1);
          Ar(1),
            yi("(", t < n.nextRate ? "*" : " ", ")"),
            Ar(1),
            ni("cursor", n.readonly || n.disabled ? "default" : "pointer"),
            Ar(1),
            jo(
              "ngTemplateOutlet",
              n.starTemplate || n.starTemplateFromContent || r
            )("ngTemplateOutletContext", n.contexts[t]);
        }
      }
      function Rd(t) {
        return null != t;
      }
      $localize`:@@ngb.pagination.first␟656506dfd46380956a655f919f1498d018f75ca0␟6867721956102594380:««`,
        $localize`:@@ngb.pagination.previous␟6e52b6ee77a4848d899dd21b591c6fd499e3aef3␟6479320895410098858:«`,
        $localize`:@@ngb.pagination.next␟ba9cbb4ff311464308a3627e4f1c3345d9fe6d7d␟5458177150283468089:»`,
        $localize`:@@ngb.pagination.last␟49f27a460bc97e7e00be5b37098bfa79884fc7d9␟5277020320267646988:»»`,
        $localize`:@@ngb.pagination.first-aria␟f2f852318759c6396b5d3d17031d53817d7b38cc␟2241508602425256033:First`,
        $localize`:@@ngb.pagination.previous-aria␟680d5c75b7fd8d37961083608b9fcdc4167b4c43␟4452427314943113135:Previous`,
        $localize`:@@ngb.pagination.next-aria␟f732c304c7433e5a83ffcd862c3dce709a0f4982␟3885497195825665706:Next`,
        $localize`:@@ngb.pagination.last-aria␟5c729788ba138508aca1bec050b610f7bf81db3e␟4882268002141858767:Last`,
        $localize`:@@ngb.progressbar.value␟f8e9a947b9db4252c0e9905765338712f2fd032f␟3720830768741091151:${"\ufffd0\ufffd"}:INTERPOLATION:`,
        $localize`:@@ngb.timepicker.HH␟ce676ab1d6d98f85c836381cf100a4a91ef95a1f␟4043638465245303811:HH`,
        $localize`:@@ngb.timepicker.hours␟3bbce5fef7e1151da052a4e529453edb340e3912␟8070396816726827304:Hours`,
        $localize`:@@ngb.timepicker.MM␟72c8edf6a50068a05bde70991e36b1e881f4ca54␟1647282246509919852:MM`,
        $localize`:@@ngb.timepicker.minutes␟41e62daa962947c0d23ded0981975d1bddf0bf38␟5531237363767747080:Minutes`,
        $localize`:@@ngb.timepicker.increment-hours␟cb74bc1d625a6c1742f0d7d47306cf495780c218␟5939278348542933629:Increment hours`,
        $localize`:@@ngb.timepicker.decrement-hours␟147c7a19429da7d999e247d22e33fee370b1691b␟3651829882940481818:Decrement hours`,
        $localize`:@@ngb.timepicker.increment-minutes␟f5a4a3bc05e053f6732475d0e74875ec01c3a348␟180147720391025024:Increment minutes`,
        $localize`:@@ngb.timepicker.decrement-minutes␟c1a6899e529c096da5b660385d4e77fe1f7ad271␟7447789825403243588:Decrement minutes`,
        $localize`:@@ngb.timepicker.SS␟ebe38d36a40a2383c5fefa9b4608ffbda08bd4a3␟3628127143071124194:SS`,
        $localize`:@@ngb.timepicker.seconds␟4f2ed9e71a7c981db3e50ae2fedb28aff2ec4e6c␟8874012390997067175:Seconds`,
        $localize`:@@ngb.timepicker.increment-seconds␟912322ecee7d659d04dcf494a70e22e49d334b26␟5364772110539092174:Increment seconds`,
        $localize`:@@ngb.timepicker.decrement-seconds␟5db47ac104294243a70eb9124fbea9d0004ddf69␟753633511487974857:Decrement seconds`,
        $localize`:@@ngb.timepicker.PM␟8d6e691e10306c1b34c6b26805151aaea320ef7f␟3564199131264287502:${"\ufffd0\ufffd"}:INTERPOLATION:`,
        $localize`:@@ngb.timepicker.AM␟69a1f176a93998876952adac57c3bc3863b6105e␟4592818992509942761:${"\ufffd0\ufffd"}:INTERPOLATION:`,
        $localize`:@@ngb.toast.close-aria␟f4e529ae5ffd73001d1ff4bbdeeb0a72e342e5c8␟7819314041543176992:Close`,
        "undefined" == typeof Element ||
          Element.prototype.closest ||
          (Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          (Element.prototype.closest = function (t) {
            let e = this;
            if (!document.documentElement.contains(e)) return null;
            do {
              if (e.matches(t)) return e;
              e = e.parentElement || e.parentNode;
            } while (null !== e && 1 === e.nodeType);
            return null;
          }));
      let Id = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        Nd = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        Vd = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        jd = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        Dd = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })();
      var Ud = (function (t) {
        return (
          (t[(t.Tab = 9)] = "Tab"),
          (t[(t.Enter = 13)] = "Enter"),
          (t[(t.Escape = 27)] = "Escape"),
          (t[(t.Space = 32)] = "Space"),
          (t[(t.PageUp = 33)] = "PageUp"),
          (t[(t.PageDown = 34)] = "PageDown"),
          (t[(t.End = 35)] = "End"),
          (t[(t.Home = 36)] = "Home"),
          (t[(t.ArrowLeft = 37)] = "ArrowLeft"),
          (t[(t.ArrowUp = 38)] = "ArrowUp"),
          (t[(t.ArrowRight = 39)] = "ArrowRight"),
          (t[(t.ArrowDown = 40)] = "ArrowDown"),
          t
        );
      })({});
      const Fd = [
        "a[href]",
        "button:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        "textarea:not([disabled])",
        "[contenteditable]",
        '[tabindex]:not([tabindex="-1"])',
      ].join(", ");
      function Ld(t) {
        const e = Array.from(t.querySelectorAll(Fd)).filter(
          (t) => -1 !== t.tabIndex
        );
        return [e[0], e[e.length - 1]];
      }
      let Hd = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc, td]],
            })),
            t
          );
        })(),
        zd = (() => {
          let t = class {};
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵdir = ye({ type: t, selectors: [["", 8, "navbar"]] })),
            t
          );
        })(),
        $d = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        qd = (() => {
          let t = class {
            constructor() {
              (this.backdrop = !0), (this.keyboard = !0);
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      class Bd {
        constructor(t, e, n) {
          (this.nodes = t), (this.viewRef = e), (this.componentRef = n);
        }
      }
      const Gd = () => {};
      let Wd = (() => {
          let t = class {
            constructor(t) {
              this._document = t;
            }
            compensate() {
              const t = this._getWidth();
              return this._isPresent(t) ? this._adjustBody(t) : Gd;
            }
            _adjustBody(t) {
              const e = this._document.body,
                n = e.style.paddingRight,
                r = parseFloat(window.getComputedStyle(e)["padding-right"]);
              return (
                (e.style["padding-right"] = r + t + "px"),
                () => (e.style["padding-right"] = n)
              );
            }
            _isPresent(t) {
              const e = this._document.body.getBoundingClientRect();
              return window.innerWidth - (e.left + e.right) >= t - 0.1 * t;
            }
            _getWidth() {
              const t = this._document.createElement("div");
              t.className = "modal-scrollbar-measure";
              const e = this._document.body;
              e.appendChild(t);
              const n = t.getBoundingClientRect().width - t.clientWidth;
              return e.removeChild(t), n;
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Zl));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Wt(Zl));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        Zd = (() => {
          let t = class {};
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ngb-modal-backdrop"]],
              hostAttrs: [2, "z-index", "1050"],
              hostVars: 2,
              hostBindings: function (t, e) {
                2 & t &&
                  si(
                    "modal-backdrop fade show" +
                      (e.backdropClass ? " " + e.backdropClass : "")
                  );
              },
              inputs: { backdropClass: "backdropClass" },
              decls: 0,
              vars: 0,
              template: function (t, e) {},
              encapsulation: 2,
            })),
            t
          );
        })();
      class Qd {
        close(t) {}
        dismiss(t) {}
      }
      class Kd {
        constructor(t, e, n, r) {
          (this._windowCmptRef = t),
            (this._contentRef = e),
            (this._backdropCmptRef = n),
            (this._beforeDismiss = r),
            t.instance.dismissEvent.subscribe((t) => {
              this.dismiss(t);
            }),
            (this.result = new Promise((t, e) => {
              (this._resolve = t), (this._reject = e);
            })),
            this.result.then(null, () => {});
        }
        get componentInstance() {
          if (this._contentRef && this._contentRef.componentRef)
            return this._contentRef.componentRef.instance;
        }
        close(t) {
          this._windowCmptRef &&
            (this._resolve(t), this._removeModalElements());
        }
        _dismiss(t) {
          this._reject(t), this._removeModalElements();
        }
        dismiss(t) {
          if (this._windowCmptRef)
            if (this._beforeDismiss) {
              const e = this._beforeDismiss();
              e && e.then
                ? e.then(
                    (e) => {
                      !1 !== e && this._dismiss(t);
                    },
                    () => {}
                  )
                : !1 !== e && this._dismiss(t);
            } else this._dismiss(t);
        }
        _removeModalElements() {
          const t = this._windowCmptRef.location.nativeElement;
          if (
            (t.parentNode.removeChild(t),
            this._windowCmptRef.destroy(),
            this._backdropCmptRef)
          ) {
            const t = this._backdropCmptRef.location.nativeElement;
            t.parentNode.removeChild(t), this._backdropCmptRef.destroy();
          }
          this._contentRef &&
            this._contentRef.viewRef &&
            this._contentRef.viewRef.destroy(),
            (this._windowCmptRef = null),
            (this._backdropCmptRef = null),
            (this._contentRef = null);
        }
      }
      var Jd = (function (t) {
        return (
          (t[(t.BACKDROP_CLICK = 0)] = "BACKDROP_CLICK"),
          (t[(t.ESC = 1)] = "ESC"),
          t
        );
      })({});
      let Yd = (() => {
          let t = class {
            constructor(t, e, n) {
              (this._document = t),
                (this._elRef = e),
                (this._zone = n),
                (this._closed$ = new O()),
                (this._elWithFocus = null),
                (this.backdrop = !0),
                (this.keyboard = !0),
                (this.dismissEvent = new Aa());
            }
            dismiss(t) {
              this.dismissEvent.emit(t);
            }
            ngOnInit() {
              this._elWithFocus = this._document.activeElement;
            }
            ngAfterViewInit() {
              const { nativeElement: t } = this._elRef;
              if (
                (this._zone.runOutsideAngular(() => {
                  id(t, "keydown")
                    .pipe(
                      dd(this._closed$),
                      nu((t) => t.which === Ud.Escape && this.keyboard)
                    )
                    .subscribe((t) =>
                      requestAnimationFrame(() => {
                        t.defaultPrevented ||
                          this._zone.run(() => this.dismiss(Jd.ESC));
                      })
                    );
                  let e = !1;
                  id(this._dialogEl.nativeElement, "mousedown")
                    .pipe(
                      dd(this._closed$),
                      wd(() => (e = !1)),
                      cd(() => id(t, "mouseup").pipe(dd(this._closed$), _d(1))),
                      nu(({ target: e }) => t === e)
                    )
                    .subscribe(() => {
                      e = !0;
                    }),
                    id(t, "click")
                      .pipe(dd(this._closed$))
                      .subscribe(({ target: n }) => {
                        !0 !== this.backdrop ||
                          t !== n ||
                          e ||
                          this._zone.run(() => this.dismiss(Jd.BACKDROP_CLICK)),
                          (e = !1);
                      });
                }),
                !t.contains(document.activeElement))
              ) {
                const e = t.querySelector("[ngbAutofocus]"),
                  n = Ld(t)[0];
                (e || n || t).focus();
              }
            }
            ngOnDestroy() {
              const t = this._document.body,
                e = this._elWithFocus;
              let n;
              (n = e && e.focus && t.contains(e) ? e : t),
                this._zone.runOutsideAngular(() => {
                  setTimeout(() => n.focus()), (this._elWithFocus = null);
                }),
                this._closed$.next();
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Zl), Io(Li), Io(ml));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ngb-modal-window"]],
              viewQuery: function (t, e) {
                var n, r;
                1 & t && ((r = Pd), !0, za(Be(), qe(), r, !0, void 0, !0)),
                  2 & t && Ha((n = $a())) && (e._dialogEl = n.first);
              },
              hostAttrs: ["role", "dialog", "tabindex", "-1"],
              hostVars: 5,
              hostBindings: function (t, e) {
                2 & t &&
                  (To("aria-modal", !0)("aria-labelledby", e.ariaLabelledBy)(
                    "aria-describedby",
                    e.ariaDescribedBy
                  ),
                  si(
                    "modal fade show d-block" +
                      (e.windowClass ? " " + e.windowClass : "")
                  ));
              },
              inputs: {
                backdrop: "backdrop",
                keyboard: "keyboard",
                ariaLabelledBy: "ariaLabelledBy",
                ariaDescribedBy: "ariaDescribedBy",
                centered: "centered",
                scrollable: "scrollable",
                size: "size",
                windowClass: "windowClass",
              },
              outputs: { dismissEvent: "dismiss" },
              ngContentSelectors: Ed,
              decls: 4,
              vars: 2,
              consts: [
                ["role", "document"],
                ["dialog", ""],
                [1, "modal-content"],
              ],
              template: function (t, e) {
                1 & t &&
                  ((function (t) {
                    const e = qe()[16][6];
                    if (!e.projection) {
                      const t = (e.projection = ne(1, null)),
                        n = t.slice();
                      let r = e.child;
                      for (; null !== r; ) {
                        const e = 0;
                        null !== e &&
                          (n[e] ? (n[e].projectionNext = r) : (t[e] = r),
                          (n[e] = r)),
                          (r = r.next);
                      }
                    }
                  })(),
                  Uo(0, "div", 0, 1),
                  Uo(2, "div", 2),
                  (function (t, e = 0, n) {
                    const r = qe(),
                      s = Be(),
                      o = Hr(s, r[6], t, 1, null, n || null);
                    null === o.projection && (o.projection = e),
                      Ke(),
                      (function (t, e, n) {
                        $s(
                          e[11],
                          0,
                          e,
                          n,
                          Is(t, n, e),
                          Us(n.parent || e[6], e)
                        );
                      })(s, r, o);
                  })(3),
                  Fo(),
                  Fo()),
                  2 & t &&
                    si(
                      "modal-dialog" +
                        (e.size ? " modal-" + e.size : "") +
                        (e.centered ? " modal-dialog-centered" : "") +
                        (e.scrollable ? " modal-dialog-scrollable" : "")
                    );
              },
              styles: [
                "ngb-modal-window .component-host-scrollable{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:hidden}",
              ],
              encapsulation: 2,
            })),
            t
          );
        })(),
        Xd = (() => {
          let t = class {
            constructor(t, e, n, r, s, o) {
              (this._applicationRef = t),
                (this._injector = e),
                (this._document = n),
                (this._scrollBar = r),
                (this._rendererFactory = s),
                (this._ngZone = o),
                (this._activeWindowCmptHasChanged = new O()),
                (this._ariaHiddenValues = new Map()),
                (this._backdropAttributes = ["backdropClass"]),
                (this._modalRefs = []),
                (this._windowAttributes = [
                  "ariaLabelledBy",
                  "ariaDescribedBy",
                  "backdrop",
                  "centered",
                  "keyboard",
                  "scrollable",
                  "size",
                  "windowClass",
                ]),
                (this._windowCmpts = []),
                (this._activeInstances = new Aa()),
                this._activeWindowCmptHasChanged.subscribe(() => {
                  if (this._windowCmpts.length) {
                    const t = this._windowCmpts[this._windowCmpts.length - 1];
                    ((t, e, n, r = !1) => {
                      this._ngZone.runOutsideAngular(() => {
                        const t = id(e, "focusin").pipe(
                          dd(n),
                          D((t) => t.target)
                        );
                        id(e, "keydown")
                          .pipe(
                            dd(n),
                            nu((t) => t.which === Ud.Tab),
                            Sd(t)
                          )
                          .subscribe(([t, n]) => {
                            const [r, s] = Ld(e);
                            (n !== r && n !== e) ||
                              !t.shiftKey ||
                              (s.focus(), t.preventDefault()),
                              n !== s ||
                                t.shiftKey ||
                                (r.focus(), t.preventDefault());
                          }),
                          r &&
                            id(e, "click")
                              .pipe(
                                dd(n),
                                Sd(t),
                                D((t) => t[1])
                              )
                              .subscribe((t) => t.focus());
                      });
                    })(
                      0,
                      t.location.nativeElement,
                      this._activeWindowCmptHasChanged
                    ),
                      this._revertAriaHidden(),
                      this._setAriaHidden(t.location.nativeElement);
                  }
                });
            }
            open(t, e, n, r) {
              const s =
                  r.container instanceof HTMLElement
                    ? r.container
                    : Rd(r.container)
                    ? this._document.querySelector(r.container)
                    : this._document.body,
                o = this._rendererFactory.createRenderer(null, null),
                i = this._scrollBar.compensate(),
                a = () => {
                  this._modalRefs.length ||
                    (o.removeClass(this._document.body, "modal-open"),
                    this._revertAriaHidden());
                };
              if (!s)
                throw new Error(
                  `The specified modal container "${
                    r.container || "body"
                  }" was not found in the DOM.`
                );
              const l = new Qd(),
                c = this._getContentRef(t, r.injector || e, n, l, r);
              let u = !1 !== r.backdrop ? this._attachBackdrop(t, s) : void 0,
                h = this._attachWindowComponent(t, s, c),
                d = new Kd(h, c, u, r.beforeDismiss);
              return (
                this._registerModalRef(d),
                this._registerWindowCmpt(h),
                d.result.then(i, i),
                d.result.then(a, a),
                (l.close = (t) => {
                  d.close(t);
                }),
                (l.dismiss = (t) => {
                  d.dismiss(t);
                }),
                this._applyWindowOptions(h.instance, r),
                1 === this._modalRefs.length &&
                  o.addClass(this._document.body, "modal-open"),
                u && u.instance && this._applyBackdropOptions(u.instance, r),
                d
              );
            }
            get activeInstances() {
              return this._activeInstances;
            }
            dismissAll(t) {
              this._modalRefs.forEach((e) => e.dismiss(t));
            }
            hasOpenModals() {
              return this._modalRefs.length > 0;
            }
            _attachBackdrop(t, e) {
              let n = t.resolveComponentFactory(Zd).create(this._injector);
              return (
                this._applicationRef.attachView(n.hostView),
                e.appendChild(n.location.nativeElement),
                n
              );
            }
            _attachWindowComponent(t, e, n) {
              let r = t
                .resolveComponentFactory(Yd)
                .create(this._injector, n.nodes);
              return (
                this._applicationRef.attachView(r.hostView),
                e.appendChild(r.location.nativeElement),
                r
              );
            }
            _applyWindowOptions(t, e) {
              this._windowAttributes.forEach((n) => {
                Rd(e[n]) && (t[n] = e[n]);
              });
            }
            _applyBackdropOptions(t, e) {
              this._backdropAttributes.forEach((n) => {
                Rd(e[n]) && (t[n] = e[n]);
              });
            }
            _getContentRef(t, e, n, r, s) {
              return n
                ? n instanceof ua
                  ? this._createFromTemplateRef(n, r)
                  : "string" == typeof n
                  ? this._createFromString(n)
                  : this._createFromComponent(t, e, n, r, s)
                : new Bd([]);
            }
            _createFromTemplateRef(t, e) {
              const n = t.createEmbeddedView({
                $implicit: e,
                close(t) {
                  e.close(t);
                },
                dismiss(t) {
                  e.dismiss(t);
                },
              });
              return (
                this._applicationRef.attachView(n), new Bd([n.rootNodes], n)
              );
            }
            _createFromString(t) {
              const e = this._document.createTextNode("" + t);
              return new Bd([[e]]);
            }
            _createFromComponent(t, e, n, r, s) {
              const o = t.resolveComponentFactory(n),
                i = yo.create({
                  providers: [{ provide: Qd, useValue: r }],
                  parent: e,
                }),
                a = o.create(i),
                l = a.location.nativeElement;
              return (
                s.scrollable && l.classList.add("component-host-scrollable"),
                this._applicationRef.attachView(a.hostView),
                new Bd([[l]], a.hostView, a)
              );
            }
            _setAriaHidden(t) {
              const e = t.parentElement;
              e &&
                t !== this._document.body &&
                (Array.from(e.children).forEach((e) => {
                  e !== t &&
                    "SCRIPT" !== e.nodeName &&
                    (this._ariaHiddenValues.set(
                      e,
                      e.getAttribute("aria-hidden")
                    ),
                    e.setAttribute("aria-hidden", "true"));
                }),
                this._setAriaHidden(e));
            }
            _revertAriaHidden() {
              this._ariaHiddenValues.forEach((t, e) => {
                t
                  ? e.setAttribute("aria-hidden", t)
                  : e.removeAttribute("aria-hidden");
              }),
                this._ariaHiddenValues.clear();
            }
            _registerModalRef(t) {
              const e = () => {
                const e = this._modalRefs.indexOf(t);
                e > -1 &&
                  (this._modalRefs.splice(e, 1),
                  this._activeInstances.emit(this._modalRefs));
              };
              this._modalRefs.push(t),
                this._activeInstances.emit(this._modalRefs),
                t.result.then(e, e);
            }
            _registerWindowCmpt(t) {
              this._windowCmpts.push(t),
                this._activeWindowCmptHasChanged.next(),
                t.onDestroy(() => {
                  const e = this._windowCmpts.indexOf(t);
                  e > -1 &&
                    (this._windowCmpts.splice(e, 1),
                    this._activeWindowCmptHasChanged.next());
                });
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Wt(jl),
                Wt(yo),
                Wt(Zl),
                Wt(Wd),
                Wt(zi),
                Wt(ml)
              );
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Wt(jl), Wt(Ut), Wt(Zl), Wt(Wd), Wt(zi), Wt(ml));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        tp = (() => {
          let t = class {
            constructor(t, e, n, r) {
              (this._moduleCFR = t),
                (this._injector = e),
                (this._modalStack = n),
                (this._config = r);
            }
            open(t, e = {}) {
              const n = Object.assign({}, this._config, e);
              return this._modalStack.open(
                this._moduleCFR,
                this._injector,
                t,
                n
              );
            }
            get activeInstances() {
              return this._modalStack.activeInstances;
            }
            dismissAll(t) {
              this._modalStack.dismissAll(t);
            }
            hasOpenModals() {
              return this._modalStack.hasOpenModals();
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(Fi), Wt(yo), Wt(Xd), Wt(qd));
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t(Wt(Fi), Wt(Ut), Wt(Xd), Wt(qd));
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })(),
        ep = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [tp],
            })),
            t
          );
        })(),
        np = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        rp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        sp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        op = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        ip = (() => {
          let t = class {
            constructor() {
              (this.max = 10), (this.readonly = !1), (this.resettable = !1);
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵprov = ct({
              factory: function () {
                return new t();
              },
              token: t,
              providedIn: "root",
            })),
            t
          );
        })();
      const ap = { provide: Uu, useExisting: Ct(() => lp), multi: !0 };
      let lp = (() => {
          let t = class {
            constructor(t, e) {
              (this._changeDetectorRef = e),
                (this.contexts = []),
                (this.disabled = !1),
                (this.hover = new Aa()),
                (this.leave = new Aa()),
                (this.rateChange = new Aa(!0)),
                (this.onChange = (t) => {}),
                (this.onTouched = () => {}),
                (this.max = t.max),
                (this.readonly = t.readonly);
            }
            ariaValueText() {
              return `${this.nextRate} out of ${this.max}`;
            }
            enter(t) {
              this.readonly || this.disabled || this._updateState(t),
                this.hover.emit(t);
            }
            handleBlur() {
              this.onTouched();
            }
            handleClick(t) {
              this.readonly ||
                this.disabled ||
                this.update(this.resettable && this.rate === t ? 0 : t);
            }
            handleKeyDown(t) {
              switch (t.which) {
                case Ud.ArrowDown:
                case Ud.ArrowLeft:
                  this.update(this.rate - 1);
                  break;
                case Ud.ArrowUp:
                case Ud.ArrowRight:
                  this.update(this.rate + 1);
                  break;
                case Ud.Home:
                  this.update(0);
                  break;
                case Ud.End:
                  this.update(this.max);
                  break;
                default:
                  return;
              }
              t.preventDefault();
            }
            ngOnChanges(t) {
              t.rate && this.update(this.rate);
            }
            ngOnInit() {
              (this.contexts = Array.from({ length: this.max }, (t, e) => ({
                fill: 0,
                index: e,
              }))),
                this._updateState(this.rate);
            }
            registerOnChange(t) {
              this.onChange = t;
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            reset() {
              this.leave.emit(this.nextRate), this._updateState(this.rate);
            }
            setDisabledState(t) {
              this.disabled = t;
            }
            update(t, e = !0) {
              const n = (function (t, e, n = 0) {
                return Math.max(Math.min(t, e), n);
              })(t, this.max, 0);
              this.readonly ||
                this.disabled ||
                this.rate === n ||
                ((this.rate = n), this.rateChange.emit(this.rate)),
                e && (this.onChange(this.rate), this.onTouched()),
                this._updateState(this.rate);
            }
            writeValue(t) {
              this.update(t, !1), this._changeDetectorRef.markForCheck();
            }
            _getFillValue(t) {
              const e = this.nextRate - t;
              return e >= 1
                ? 100
                : e < 1 && e > 0
                ? parseInt((100 * e).toFixed(2), 10)
                : 0;
            }
            _updateState(t) {
              (this.nextRate = t),
                this.contexts.forEach(
                  (t, e) => (t.fill = this._getFillValue(e))
                );
            }
          };
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(ip), Io(to));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["ngb-rating"]],
              contentQueries: function (t, e, n) {
                var r, s, o, i, a;
                1 & t &&
                  ((s = n),
                  (o = ua),
                  (i = !0),
                  (function (t, e, n, r, s, o, i, a) {
                    t.firstCreatePass &&
                      (Ba(t, new Va(n, r, !1, s), i.index),
                      (function (t, e) {
                        const n = t.contentQueries || (t.contentQueries = []);
                        e !==
                          (t.contentQueries.length ? n[n.length - 1] : -1) &&
                          n.push(t.queries.length - 1, e);
                      })(t, a)),
                      qa(t, e);
                  })(Be(), qe(), o, i, a, 0, We(), s)),
                  2 & t &&
                    Ha((r = $a())) &&
                    (e.starTemplateFromContent = r.first);
              },
              hostAttrs: [
                "role",
                "slider",
                "aria-valuemin",
                "0",
                1,
                "d-inline-flex",
              ],
              hostVars: 5,
              hostBindings: function (t, e) {
                1 & t &&
                  qo("blur", function () {
                    return e.handleBlur();
                  })("keydown", function (t) {
                    return e.handleKeyDown(t);
                  })("mouseleave", function () {
                    return e.reset();
                  }),
                  2 & t &&
                    (_i("tabindex", e.disabled ? -1 : 0),
                    To("aria-valuemax", e.max)("aria-valuenow", e.nextRate)(
                      "aria-valuetext",
                      e.ariaValueText()
                    )("aria-disabled", !!e.readonly || null));
              },
              inputs: {
                max: "max",
                readonly: "readonly",
                rate: "rate",
                resettable: "resettable",
                starTemplate: "starTemplate",
              },
              outputs: {
                hover: "hover",
                leave: "leave",
                rateChange: "rateChange",
              },
              features: [ji([ap]), ki],
              decls: 3,
              vars: 1,
              consts: [
                ["t", ""],
                ["ngFor", "", 3, "ngForOf"],
                [1, "sr-only"],
                [3, "mouseenter", "click"],
                [3, "ngTemplateOutlet", "ngTemplateOutletContext"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Mo(0, Td, 1, 1, "ng-template", null, 0, Wa),
                  Mo(2, Md, 4, 5, "ng-template", 1)),
                  2 & t && (Ar(2), jo("ngForOf", e.contexts));
              },
              directives: [yc, Cc],
              encapsulation: 2,
              changeDetection: 0,
            })),
            t
          );
        })(),
        cp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        up = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        hp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        dp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })(),
        pp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
            })),
            t
          );
        })(),
        fp = (() => {
          let t = class {};
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[xc]],
            })),
            t
          );
        })();
      const gp = [
        Id,
        Nd,
        Vd,
        jd,
        Dd,
        Hd,
        $d,
        ep,
        np,
        rp,
        sp,
        op,
        cp,
        hp,
        dp,
        pp,
        fp,
        up,
      ];
      let mp = (() => {
        let t = class {};
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)();
            },
            imports: [
              gp,
              Id,
              Nd,
              Vd,
              jd,
              Dd,
              Hd,
              $d,
              ep,
              np,
              rp,
              sp,
              op,
              cp,
              hp,
              dp,
              pp,
              fp,
              up,
            ],
          })),
          t
        );
      })();
      const yp = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "no elements in sequence"),
            (this.name = "EmptyError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      function _p(t) {
        return new b((e) => {
          let n;
          try {
            n = t();
          } catch (r) {
            return void e.error(r);
          }
          return (n ? H(n) : yd()).subscribe(e);
        });
      }
      function vp(t) {
        return function (e) {
          return 0 === t ? yd() : e.lift(new bp(t));
        };
      }
      class bp {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new gd();
        }
        call(t, e) {
          return e.subscribe(new wp(t, this.total));
        }
      }
      class wp extends f {
        constructor(t, e) {
          super(t),
            (this.total = e),
            (this.ring = new Array()),
            (this.count = 0);
        }
        _next(t) {
          const e = this.ring,
            n = this.total,
            r = this.count++;
          e.length < n ? e.push(t) : (e[r % n] = t);
        }
        _complete() {
          const t = this.destination;
          let e = this.count;
          if (e > 0) {
            const n = this.count >= this.total ? this.total : this.count,
              r = this.ring;
            for (let s = 0; s < n; s++) {
              const s = e++ % n;
              t.next(r[s]);
            }
          }
          t.complete();
        }
      }
      function Cp(t = Op) {
        return (e) => e.lift(new xp(t));
      }
      class xp {
        constructor(t) {
          this.errorFactory = t;
        }
        call(t, e) {
          return e.subscribe(new Sp(t, this.errorFactory));
        }
      }
      class Sp extends f {
        constructor(t, e) {
          super(t), (this.errorFactory = e), (this.hasValue = !1);
        }
        _next(t) {
          (this.hasValue = !0), this.destination.next(t);
        }
        _complete() {
          if (this.hasValue) return this.destination.complete();
          {
            let e;
            try {
              e = this.errorFactory();
            } catch (t) {
              e = t;
            }
            this.destination.error(e);
          }
        }
      }
      function Op() {
        return new yp();
      }
      function kp(t = null) {
        return (e) => e.lift(new Ep(t));
      }
      class Ep {
        constructor(t) {
          this.defaultValue = t;
        }
        call(t, e) {
          return e.subscribe(new Pp(t, this.defaultValue));
        }
      }
      class Pp extends f {
        constructor(t, e) {
          super(t), (this.defaultValue = e), (this.isEmpty = !0);
        }
        _next(t) {
          (this.isEmpty = !1), this.destination.next(t);
        }
        _complete() {
          this.isEmpty && this.destination.next(this.defaultValue),
            this.destination.complete();
        }
      }
      function Tp(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? nu((e, n) => t(e, n, r)) : y,
            vp(1),
            n ? kp(e) : Cp(() => new yp())
          );
      }
      function Ap(t) {
        return function (e) {
          const n = new Mp(t),
            r = e.lift(n);
          return (n.caught = r);
        };
      }
      class Mp {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new Rp(t, this.selector, this.caught));
        }
      }
      class Rp extends j {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const r = new P(this, void 0, void 0);
            this.add(r);
            const s = V(this, n, void 0, void 0, r);
            s !== r && this.add(s);
          }
        }
      }
      function Ip(t, e) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            t ? nu((e, n) => t(e, n, r)) : y,
            _d(1),
            n ? kp(e) : Cp(() => new yp())
          );
      }
      class Np {
        constructor(t, e, n) {
          (this.predicate = t), (this.thisArg = e), (this.source = n);
        }
        call(t, e) {
          return e.subscribe(
            new Vp(t, this.predicate, this.thisArg, this.source)
          );
        }
      }
      class Vp extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.predicate = e),
            (this.thisArg = n),
            (this.source = r),
            (this.index = 0),
            (this.thisArg = n || this);
        }
        notifyComplete(t) {
          this.destination.next(t), this.destination.complete();
        }
        _next(t) {
          let e = !1;
          try {
            e = this.predicate.call(this.thisArg, t, this.index++, this.source);
          } catch (n) {
            return void this.destination.error(n);
          }
          e || this.notifyComplete(!1);
        }
        _complete() {
          this.notifyComplete(!0);
        }
      }
      function jp(t, e) {
        let n = !1;
        return (
          arguments.length >= 2 && (n = !0),
          function (r) {
            return r.lift(new Dp(t, e, n));
          }
        );
      }
      class Dp {
        constructor(t, e, n = !1) {
          (this.accumulator = t), (this.seed = e), (this.hasSeed = n);
        }
        call(t, e) {
          return e.subscribe(
            new Up(t, this.accumulator, this.seed, this.hasSeed)
          );
        }
      }
      class Up extends f {
        constructor(t, e, n, r) {
          super(t),
            (this.accumulator = e),
            (this._seed = n),
            (this.hasSeed = r),
            (this.index = 0);
        }
        get seed() {
          return this._seed;
        }
        set seed(t) {
          (this.hasSeed = !0), (this._seed = t);
        }
        _next(t) {
          if (this.hasSeed) return this._tryNext(t);
          (this.seed = t), this.destination.next(t);
        }
        _tryNext(t) {
          const e = this.index++;
          let n;
          try {
            n = this.accumulator(this.seed, t, e);
          } catch (r) {
            this.destination.error(r);
          }
          (this.seed = n), this.destination.next(n);
        }
      }
      class Fp {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new Lp(t, this.callback));
        }
      }
      class Lp extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class Hp {
        constructor(t, e) {
          (this.id = t), (this.url = e);
        }
      }
      class zp extends Hp {
        constructor(t, e, n = "imperative", r = null) {
          super(t, e), (this.navigationTrigger = n), (this.restoredState = r);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class $p extends Hp {
        constructor(t, e, n) {
          super(t, e), (this.urlAfterRedirects = n);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class qp extends Hp {
        constructor(t, e, n) {
          super(t, e), (this.reason = n);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Bp extends Hp {
        constructor(t, e, n) {
          super(t, e), (this.error = n);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class Gp extends Hp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Wp extends Hp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Zp extends Hp {
        constructor(t, e, n, r, s) {
          super(t, e),
            (this.urlAfterRedirects = n),
            (this.state = r),
            (this.shouldActivate = s);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class Qp extends Hp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Kp extends Hp {
        constructor(t, e, n, r) {
          super(t, e), (this.urlAfterRedirects = n), (this.state = r);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class Jp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class Yp {
        constructor(t) {
          this.route = t;
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class Xp {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class tf {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class ef {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class nf {
        constructor(t) {
          this.snapshot = t;
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class rf {
        constructor(t, e, n) {
          (this.routerEvent = t), (this.position = e), (this.anchor = n);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      let sf = (() => {
        class t {}
        return (
          (t.ɵfac = function (e) {
            return new (e || t)();
          }),
          (t.ɵcmp = he({
            type: t,
            selectors: [["ng-component"]],
            decls: 1,
            vars: 0,
            template: function (t, e) {
              1 & t && Lo(0, "router-outlet");
            },
            directives: function () {
              return [cm];
            },
            encapsulation: 2,
          })),
          t
        );
      })();
      class of {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return this.params.hasOwnProperty(t);
        }
        get(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e[0] : e;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const e = this.params[t];
            return Array.isArray(e) ? e : [e];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function af(t) {
        return new of(t);
      }
      function lf(t) {
        const e = Error("NavigationCancelingError: " + t);
        return (e.ngNavigationCancelingError = !0), e;
      }
      function cf(t, e, n) {
        const r = n.path.split("/");
        if (r.length > t.length) return null;
        if ("full" === n.pathMatch && (e.hasChildren() || r.length < t.length))
          return null;
        const s = {};
        for (let o = 0; o < r.length; o++) {
          const e = r[o],
            n = t[o];
          if (e.startsWith(":")) s[e.substring(1)] = n;
          else if (e !== n.path) return null;
        }
        return { consumed: t.slice(0, r.length), posParams: s };
      }
      class uf {
        constructor(t, e) {
          (this.routes = t), (this.module = e);
        }
      }
      function hf(t, e = "") {
        for (let n = 0; n < t.length; n++) {
          const r = t[n];
          df(r, pf(e, r));
        }
      }
      function df(t, e) {
        if (!t)
          throw new Error(
            `\n      Invalid configuration of route '${e}': Encountered undefined route.\n      The reason might be an extra comma.\n\n      Example:\n      const routes: Routes = [\n        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },\n        { path: 'dashboard',  component: DashboardComponent },, << two commas\n        { path: 'detail/:id', component: HeroDetailComponent }\n      ];\n    `
          );
        if (Array.isArray(t))
          throw new Error(
            `Invalid configuration of route '${e}': Array cannot be specified`
          );
        if (
          !t.component &&
          !t.children &&
          !t.loadChildren &&
          t.outlet &&
          "primary" !== t.outlet
        )
          throw new Error(
            `Invalid configuration of route '${e}': a componentless route without children or loadChildren cannot have a named outlet set`
          );
        if (t.redirectTo && t.children)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and children cannot be used together`
          );
        if (t.redirectTo && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and loadChildren cannot be used together`
          );
        if (t.children && t.loadChildren)
          throw new Error(
            `Invalid configuration of route '${e}': children and loadChildren cannot be used together`
          );
        if (t.redirectTo && t.component)
          throw new Error(
            `Invalid configuration of route '${e}': redirectTo and component cannot be used together`
          );
        if (t.path && t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': path and matcher cannot be used together`
          );
        if (
          void 0 === t.redirectTo &&
          !t.component &&
          !t.children &&
          !t.loadChildren
        )
          throw new Error(
            `Invalid configuration of route '${e}'. One of the following must be provided: component, redirectTo, children or loadChildren`
          );
        if (void 0 === t.path && void 0 === t.matcher)
          throw new Error(
            `Invalid configuration of route '${e}': routes must have either a path or a matcher specified`
          );
        if ("string" == typeof t.path && "/" === t.path.charAt(0))
          throw new Error(
            `Invalid configuration of route '${e}': path cannot start with a slash`
          );
        if ("" === t.path && void 0 !== t.redirectTo && void 0 === t.pathMatch)
          throw new Error(
            `Invalid configuration of route '{path: "${e}", redirectTo: "${t.redirectTo}"}': please provide 'pathMatch'. The default value of 'pathMatch' is 'prefix', but often the intent is to use 'full'.`
          );
        if (
          void 0 !== t.pathMatch &&
          "full" !== t.pathMatch &&
          "prefix" !== t.pathMatch
        )
          throw new Error(
            `Invalid configuration of route '${e}': pathMatch can only be set to 'prefix' or 'full'`
          );
        t.children && hf(t.children, e);
      }
      function pf(t, e) {
        return e
          ? t || e.path
            ? t && !e.path
              ? t + "/"
              : !t && e.path
              ? e.path
              : `${t}/${e.path}`
            : ""
          : t;
      }
      function ff(t) {
        const e = t.children && t.children.map(ff),
          n = e
            ? Object.assign(Object.assign({}, t), { children: e })
            : Object.assign({}, t);
        return (
          !n.component &&
            (e || n.loadChildren) &&
            n.outlet &&
            "primary" !== n.outlet &&
            (n.component = sf),
          n
        );
      }
      function gf(t, e) {
        const n = Object.keys(t),
          r = Object.keys(e);
        if (!n || !r || n.length != r.length) return !1;
        let s;
        for (let o = 0; o < n.length; o++)
          if (((s = n[o]), !mf(t[s], e[s]))) return !1;
        return !0;
      }
      function mf(t, e) {
        return Array.isArray(t) && Array.isArray(e)
          ? t.length == e.length && t.every((t) => e.indexOf(t) > -1)
          : t === e;
      }
      function yf(t) {
        return Array.prototype.concat.apply([], t);
      }
      function _f(t) {
        return t.length > 0 ? t[t.length - 1] : null;
      }
      function vf(t, e) {
        for (const n in t) t.hasOwnProperty(n) && e(t[n], n);
      }
      function bf(t) {
        return $o(t) ? t : zo(t) ? H(Promise.resolve(t)) : tu(t);
      }
      function wf(t, e, n) {
        return n
          ? (function (t, e) {
              return gf(t, e);
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                if (!Of(e.segments, n.segments)) return !1;
                if (e.numberOfChildren !== n.numberOfChildren) return !1;
                for (const r in n.children) {
                  if (!e.children[r]) return !1;
                  if (!t(e.children[r], n.children[r])) return !1;
                }
                return !0;
              })(t.root, e.root)
          : (function (t, e) {
              return (
                Object.keys(e).length <= Object.keys(t).length &&
                Object.keys(e).every((n) => mf(t[n], e[n]))
              );
            })(t.queryParams, e.queryParams) &&
              (function t(e, n) {
                return (function e(n, r, s) {
                  if (n.segments.length > s.length)
                    return (
                      !!Of(n.segments.slice(0, s.length), s) && !r.hasChildren()
                    );
                  if (n.segments.length === s.length) {
                    if (!Of(n.segments, s)) return !1;
                    for (const e in r.children) {
                      if (!n.children[e]) return !1;
                      if (!t(n.children[e], r.children[e])) return !1;
                    }
                    return !0;
                  }
                  {
                    const t = s.slice(0, n.segments.length),
                      o = s.slice(n.segments.length);
                    return (
                      !!Of(n.segments, t) &&
                      !!n.children.primary &&
                      e(n.children.primary, r, o)
                    );
                  }
                })(e, n, n.segments);
              })(t.root, e.root);
      }
      class Cf {
        constructor(t, e, n) {
          (this.root = t), (this.queryParams = e), (this.fragment = n);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = af(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return Tf.serialize(this);
        }
      }
      class xf {
        constructor(t, e) {
          (this.segments = t),
            (this.children = e),
            (this.parent = null),
            vf(e, (t, e) => (t.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return Af(this);
        }
      }
      class Sf {
        constructor(t, e) {
          (this.path = t), (this.parameters = e);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = af(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return jf(this);
        }
      }
      function Of(t, e) {
        return t.length === e.length && t.every((t, n) => t.path === e[n].path);
      }
      function kf(t, e) {
        let n = [];
        return (
          vf(t.children, (t, r) => {
            "primary" === r && (n = n.concat(e(t, r)));
          }),
          vf(t.children, (t, r) => {
            "primary" !== r && (n = n.concat(e(t, r)));
          }),
          n
        );
      }
      class Ef {}
      class Pf {
        parse(t) {
          const e = new Hf(t);
          return new Cf(
            e.parseRootSegment(),
            e.parseQueryParams(),
            e.parseFragment()
          );
        }
        serialize(t) {
          return `${
            "/" +
            (function t(e, n) {
              if (!e.hasChildren()) return Af(e);
              if (n) {
                const n = e.children.primary ? t(e.children.primary, !1) : "",
                  r = [];
                return (
                  vf(e.children, (e, n) => {
                    "primary" !== n && r.push(`${n}:${t(e, !1)}`);
                  }),
                  r.length > 0 ? `${n}(${r.join("//")})` : n
                );
              }
              {
                const n = kf(e, (n, r) =>
                  "primary" === r
                    ? [t(e.children.primary, !1)]
                    : [`${r}:${t(n, !1)}`]
                );
                return `${Af(e)}/(${n.join("//")})`;
              }
            })(t.root, !0)
          }${(function (t) {
            const e = Object.keys(t).map((e) => {
              const n = t[e];
              return Array.isArray(n)
                ? n.map((t) => `${Rf(e)}=${Rf(t)}`).join("&")
                : `${Rf(e)}=${Rf(n)}`;
            });
            return e.length ? "?" + e.join("&") : "";
          })(t.queryParams)}${
            "string" == typeof t.fragment ? "#" + encodeURI(t.fragment) : ""
          }`;
        }
      }
      const Tf = new Pf();
      function Af(t) {
        return t.segments.map((t) => jf(t)).join("/");
      }
      function Mf(t) {
        return encodeURIComponent(t)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function Rf(t) {
        return Mf(t).replace(/%3B/gi, ";");
      }
      function If(t) {
        return Mf(t)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function Nf(t) {
        return decodeURIComponent(t);
      }
      function Vf(t) {
        return Nf(t.replace(/\+/g, "%20"));
      }
      function jf(t) {
        return `${If(t.path)}${
          ((e = t.parameters),
          Object.keys(e)
            .map((t) => `;${If(t)}=${If(e[t])}`)
            .join(""))
        }`;
        var e;
      }
      const Df = /^[^\/()?;=#]+/;
      function Uf(t) {
        const e = t.match(Df);
        return e ? e[0] : "";
      }
      const Ff = /^[^=?&#]+/,
        Lf = /^[^?&#]+/;
      class Hf {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new xf([], {})
              : new xf([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let e = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (e = this.parseParens(!0)));
          let n = {};
          return (
            this.peekStartsWith("(") && (n = this.parseParens(!1)),
            (t.length > 0 || Object.keys(e).length > 0) &&
              (n.primary = new xf(t, e)),
            n
          );
        }
        parseSegment() {
          const t = Uf(this.remaining);
          if ("" === t && this.peekStartsWith(";"))
            throw new Error(
              `Empty path url segment cannot have parameters: '${this.remaining}'.`
            );
          return this.capture(t), new Sf(Nf(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const e = Uf(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = Uf(this.remaining);
            t && ((n = t), this.capture(n));
          }
          t[Nf(e)] = Nf(n);
        }
        parseQueryParam(t) {
          const e = (function (t) {
            const e = t.match(Ff);
            return e ? e[0] : "";
          })(this.remaining);
          if (!e) return;
          this.capture(e);
          let n = "";
          if (this.consumeOptional("=")) {
            const t = (function (t) {
              const e = t.match(Lf);
              return e ? e[0] : "";
            })(this.remaining);
            t && ((n = t), this.capture(n));
          }
          const r = Vf(e),
            s = Vf(n);
          if (t.hasOwnProperty(r)) {
            let e = t[r];
            Array.isArray(e) || ((e = [e]), (t[r] = e)), e.push(s);
          } else t[r] = s;
        }
        parseParens(t) {
          const e = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const n = Uf(this.remaining),
              r = this.remaining[n.length];
            if ("/" !== r && ")" !== r && ";" !== r)
              throw new Error(`Cannot parse url '${this.url}'`);
            let s = void 0;
            n.indexOf(":") > -1
              ? ((s = n.substr(0, n.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = "primary");
            const o = this.parseChildren();
            (e[s] = 1 === Object.keys(o).length ? o.primary : new xf([], o)),
              this.consumeOptional("//");
          }
          return e;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new Error(`Expected "${t}".`);
        }
      }
      class zf {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const e = this.pathFromRoot(t);
          return e.length > 1 ? e[e.length - 2] : null;
        }
        children(t) {
          const e = $f(t, this._root);
          return e ? e.children.map((t) => t.value) : [];
        }
        firstChild(t) {
          const e = $f(t, this._root);
          return e && e.children.length > 0 ? e.children[0].value : null;
        }
        siblings(t) {
          const e = qf(t, this._root);
          return e.length < 2
            ? []
            : e[e.length - 2].children
                .map((t) => t.value)
                .filter((e) => e !== t);
        }
        pathFromRoot(t) {
          return qf(t, this._root).map((t) => t.value);
        }
      }
      function $f(t, e) {
        if (t === e.value) return e;
        for (const n of e.children) {
          const e = $f(t, n);
          if (e) return e;
        }
        return null;
      }
      function qf(t, e) {
        if (t === e.value) return [e];
        for (const n of e.children) {
          const r = qf(t, n);
          if (r.length) return r.unshift(e), r;
        }
        return [];
      }
      class Bf {
        constructor(t, e) {
          (this.value = t), (this.children = e);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function Gf(t) {
        const e = {};
        return t && t.children.forEach((t) => (e[t.value.outlet] = t)), e;
      }
      class Wf extends zf {
        constructor(t, e) {
          super(t), (this.snapshot = e), Xf(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Zf(t, e) {
        const n = (function (t, e) {
            const n = new Jf(
              [],
              {},
              {},
              "",
              {},
              "primary",
              e,
              null,
              t.root,
              -1,
              {}
            );
            return new Yf("", new Bf(n, []));
          })(t, e),
          r = new ed([new Sf("", {})]),
          s = new ed({}),
          o = new ed({}),
          i = new ed({}),
          a = new ed(""),
          l = new Qf(r, s, i, a, o, "primary", e, n.root);
        return (l.snapshot = n.root), new Wf(new Bf(l, []), n);
      }
      class Qf {
        constructor(t, e, n, r, s, o, i, a) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = i),
            (this._futureSnapshot = a);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(D((t) => af(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(D((t) => af(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Kf(t, e = "emptyOnly") {
        const n = t.pathFromRoot;
        let r = 0;
        if ("always" !== e)
          for (r = n.length - 1; r >= 1; ) {
            const t = n[r],
              e = n[r - 1];
            if (t.routeConfig && "" === t.routeConfig.path) r--;
            else {
              if (e.component) break;
              r--;
            }
          }
        return (function (t) {
          return t.reduce(
            (t, e) => ({
              params: Object.assign(Object.assign({}, t.params), e.params),
              data: Object.assign(Object.assign({}, t.data), e.data),
              resolve: Object.assign(
                Object.assign({}, t.resolve),
                e._resolvedData
              ),
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Jf {
        constructor(t, e, n, r, s, o, i, a, l, c, u) {
          (this.url = t),
            (this.params = e),
            (this.queryParams = n),
            (this.fragment = r),
            (this.data = s),
            (this.outlet = o),
            (this.component = i),
            (this.routeConfig = a),
            (this._urlSegment = l),
            (this._lastPathIndex = c),
            (this._resolve = u);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = af(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = af(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((t) => t.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Yf extends zf {
        constructor(t, e) {
          super(e), (this.url = t), Xf(this, e);
        }
        toString() {
          return tg(this._root);
        }
      }
      function Xf(t, e) {
        (e.value._routerState = t), e.children.forEach((e) => Xf(t, e));
      }
      function tg(t) {
        const e =
          t.children.length > 0 ? ` { ${t.children.map(tg).join(", ")} } ` : "";
        return `${t.value}${e}`;
      }
      function eg(t) {
        if (t.snapshot) {
          const e = t.snapshot,
            n = t._futureSnapshot;
          (t.snapshot = n),
            gf(e.queryParams, n.queryParams) ||
              t.queryParams.next(n.queryParams),
            e.fragment !== n.fragment && t.fragment.next(n.fragment),
            gf(e.params, n.params) || t.params.next(n.params),
            (function (t, e) {
              if (t.length !== e.length) return !1;
              for (let n = 0; n < t.length; ++n) if (!gf(t[n], e[n])) return !1;
              return !0;
            })(e.url, n.url) || t.url.next(n.url),
            gf(e.data, n.data) || t.data.next(n.data);
        } else
          (t.snapshot = t._futureSnapshot), t.data.next(t._futureSnapshot.data);
      }
      function ng(t, e) {
        var n, r;
        return (
          gf(t.params, e.params) &&
          Of((n = t.url), (r = e.url)) &&
          n.every((t, e) => gf(t.parameters, r[e].parameters)) &&
          !(!t.parent != !e.parent) &&
          (!t.parent || ng(t.parent, e.parent))
        );
      }
      function rg(t) {
        return (
          "object" == typeof t && null != t && !t.outlets && !t.segmentPath
        );
      }
      function sg(t, e, n, r, s) {
        let o = {};
        return (
          r &&
            vf(r, (t, e) => {
              o[e] = Array.isArray(t) ? t.map((t) => "" + t) : "" + t;
            }),
          new Cf(
            n.root === t
              ? e
              : (function t(e, n, r) {
                  const s = {};
                  return (
                    vf(e.children, (e, o) => {
                      s[o] = e === n ? r : t(e, n, r);
                    }),
                    new xf(e.segments, s)
                  );
                })(n.root, t, e),
            o,
            s
          )
        );
      }
      class og {
        constructor(t, e, n) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = e),
            (this.commands = n),
            t && n.length > 0 && rg(n[0]))
          )
            throw new Error("Root segment cannot have matrix parameters");
          const r = n.find(
            (t) => "object" == typeof t && null != t && t.outlets
          );
          if (r && r !== _f(n))
            throw new Error("{outlets:{}} has to be the last command");
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class ig {
        constructor(t, e, n) {
          (this.segmentGroup = t), (this.processChildren = e), (this.index = n);
        }
      }
      function ag(t) {
        return "object" == typeof t && null != t && t.outlets
          ? t.outlets.primary
          : "" + t;
      }
      function lg(t, e, n) {
        if (
          (t || (t = new xf([], {})),
          0 === t.segments.length && t.hasChildren())
        )
          return cg(t, e, n);
        const r = (function (t, e, n) {
            let r = 0,
              s = e;
            const o = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; s < t.segments.length; ) {
              if (r >= n.length) return o;
              const e = t.segments[s],
                i = ag(n[r]),
                a = r < n.length - 1 ? n[r + 1] : null;
              if (s > 0 && void 0 === i) break;
              if (i && a && "object" == typeof a && void 0 === a.outlets) {
                if (!pg(i, a, e)) return o;
                r += 2;
              } else {
                if (!pg(i, {}, e)) return o;
                r++;
              }
              s++;
            }
            return { match: !0, pathIndex: s, commandIndex: r };
          })(t, e, n),
          s = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < t.segments.length) {
          const e = new xf(t.segments.slice(0, r.pathIndex), {});
          return (
            (e.children.primary = new xf(
              t.segments.slice(r.pathIndex),
              t.children
            )),
            cg(e, 0, s)
          );
        }
        return r.match && 0 === s.length
          ? new xf(t.segments, {})
          : r.match && !t.hasChildren()
          ? ug(t, e, n)
          : r.match
          ? cg(t, 0, s)
          : ug(t, e, n);
      }
      function cg(t, e, n) {
        if (0 === n.length) return new xf(t.segments, {});
        {
          const r = (function (t) {
              return "object" != typeof t[0] || void 0 === t[0].outlets
                ? { primary: t }
                : t[0].outlets;
            })(n),
            s = {};
          return (
            vf(r, (n, r) => {
              null !== n && (s[r] = lg(t.children[r], e, n));
            }),
            vf(t.children, (t, e) => {
              void 0 === r[e] && (s[e] = t);
            }),
            new xf(t.segments, s)
          );
        }
      }
      function ug(t, e, n) {
        const r = t.segments.slice(0, e);
        let s = 0;
        for (; s < n.length; ) {
          if ("object" == typeof n[s] && void 0 !== n[s].outlets) {
            const t = hg(n[s].outlets);
            return new xf(r, t);
          }
          if (0 === s && rg(n[0])) {
            r.push(new Sf(t.segments[e].path, n[0])), s++;
            continue;
          }
          const o = ag(n[s]),
            i = s < n.length - 1 ? n[s + 1] : null;
          o && i && rg(i)
            ? (r.push(new Sf(o, dg(i))), (s += 2))
            : (r.push(new Sf(o, {})), s++);
        }
        return new xf(r, {});
      }
      function hg(t) {
        const e = {};
        return (
          vf(t, (t, n) => {
            null !== t && (e[n] = ug(new xf([], {}), 0, t));
          }),
          e
        );
      }
      function dg(t) {
        const e = {};
        return vf(t, (t, n) => (e[n] = "" + t)), e;
      }
      function pg(t, e, n) {
        return t == n.path && gf(e, n.parameters);
      }
      class fg {
        constructor(t, e, n, r) {
          (this.routeReuseStrategy = t),
            (this.futureState = e),
            (this.currState = n),
            (this.forwardEvent = r);
        }
        activate(t) {
          const e = this.futureState._root,
            n = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(e, n, t),
            eg(this.futureState.root),
            this.activateChildRoutes(e, n, t);
        }
        deactivateChildRoutes(t, e, n) {
          const r = Gf(e);
          t.children.forEach((t) => {
            const e = t.value.outlet;
            this.deactivateRoutes(t, r[e], n), delete r[e];
          }),
            vf(r, (t, e) => {
              this.deactivateRouteAndItsChildren(t, n);
            });
        }
        deactivateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if (r === s)
            if (r.component) {
              const s = n.getContext(r.outlet);
              s && this.deactivateChildRoutes(t, e, s.children);
            } else this.deactivateChildRoutes(t, e, n);
          else s && this.deactivateRouteAndItsChildren(e, n);
        }
        deactivateRouteAndItsChildren(t, e) {
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, e)
            : this.deactivateRouteAndOutlet(t, e);
        }
        detachAndStoreRouteSubtree(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n && n.outlet) {
            const e = n.outlet.detach(),
              r = n.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: e,
              route: t,
              contexts: r,
            });
          }
        }
        deactivateRouteAndOutlet(t, e) {
          const n = e.getContext(t.value.outlet);
          if (n) {
            const r = Gf(t),
              s = t.value.component ? n.children : e;
            vf(r, (t, e) => this.deactivateRouteAndItsChildren(t, s)),
              n.outlet &&
                (n.outlet.deactivate(), n.children.onOutletDeactivated());
          }
        }
        activateChildRoutes(t, e, n) {
          const r = Gf(e);
          t.children.forEach((t) => {
            this.activateRoutes(t, r[t.value.outlet], n),
              this.forwardEvent(new nf(t.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new tf(t.value.snapshot));
        }
        activateRoutes(t, e, n) {
          const r = t.value,
            s = e ? e.value : null;
          if ((eg(r), r === s))
            if (r.component) {
              const s = n.getOrCreateContext(r.outlet);
              this.activateChildRoutes(t, e, s.children);
            } else this.activateChildRoutes(t, e, n);
          else if (r.component) {
            const e = n.getOrCreateContext(r.outlet);
            if (this.routeReuseStrategy.shouldAttach(r.snapshot)) {
              const t = this.routeReuseStrategy.retrieve(r.snapshot);
              this.routeReuseStrategy.store(r.snapshot, null),
                e.children.onOutletReAttached(t.contexts),
                (e.attachRef = t.componentRef),
                (e.route = t.route.value),
                e.outlet && e.outlet.attach(t.componentRef, t.route.value),
                gg(t.route);
            } else {
              const n = (function (t) {
                  for (let e = t.parent; e; e = e.parent) {
                    const t = e.routeConfig;
                    if (t && t._loadedConfig) return t._loadedConfig;
                    if (t && t.component) return null;
                  }
                  return null;
                })(r.snapshot),
                s = n ? n.module.componentFactoryResolver : null;
              (e.attachRef = null),
                (e.route = r),
                (e.resolver = s),
                e.outlet && e.outlet.activateWith(r, s),
                this.activateChildRoutes(t, null, e.children);
            }
          } else this.activateChildRoutes(t, null, n);
        }
      }
      function gg(t) {
        eg(t.value), t.children.forEach(gg);
      }
      function mg(t) {
        return "function" == typeof t;
      }
      function yg(t) {
        return t instanceof Cf;
      }
      class _g {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class vg {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function bg(t) {
        return new b((e) => e.error(new _g(t)));
      }
      function wg(t) {
        return new b((e) => e.error(new vg(t)));
      }
      function Cg(t) {
        return new b((e) =>
          e.error(
            new Error(
              `Only absolute redirects can have named outlets. redirectTo: '${t}'`
            )
          )
        );
      }
      class xg {
        constructor(t, e, n, r, s) {
          (this.configLoader = e),
            (this.urlSerializer = n),
            (this.urlTree = r),
            (this.config = s),
            (this.allowRedirects = !0),
            (this.ngModule = t.get(Jt));
        }
        apply() {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            this.urlTree.root,
            "primary"
          )
            .pipe(
              D((t) =>
                this.createUrlTree(
                  t,
                  this.urlTree.queryParams,
                  this.urlTree.fragment
                )
              )
            )
            .pipe(
              Ap((t) => {
                if (t instanceof vg)
                  return (this.allowRedirects = !1), this.match(t.urlTree);
                if (t instanceof _g) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        match(t) {
          return this.expandSegmentGroup(
            this.ngModule,
            this.config,
            t.root,
            "primary"
          )
            .pipe(D((e) => this.createUrlTree(e, t.queryParams, t.fragment)))
            .pipe(
              Ap((t) => {
                if (t instanceof _g) throw this.noMatchError(t);
                throw t;
              })
            );
        }
        noMatchError(t) {
          return new Error(
            `Cannot match any routes. URL Segment: '${t.segmentGroup}'`
          );
        }
        createUrlTree(t, e, n) {
          const r = t.segments.length > 0 ? new xf([], { primary: t }) : t;
          return new Cf(r, e, n);
        }
        expandSegmentGroup(t, e, n, r) {
          return 0 === n.segments.length && n.hasChildren()
            ? this.expandChildren(t, e, n).pipe(D((t) => new xf([], t)))
            : this.expandSegment(t, n, e, n.segments, r, !0);
        }
        expandChildren(t, e, n) {
          return (function (t, e) {
            if (0 === Object.keys(t).length) return tu({});
            const n = [],
              r = [],
              s = {};
            return (
              vf(t, (t, o) => {
                const i = e(o, t).pipe(D((t) => (s[o] = t)));
                "primary" === o ? n.push(i) : r.push(i);
              }),
              tu.apply(null, n.concat(r)).pipe(
                ad(),
                Tp(),
                D(() => s)
              )
            );
          })(n.children, (n, r) => this.expandSegmentGroup(t, e, r, n));
        }
        expandSegment(t, e, n, r, s, o) {
          return tu(...n).pipe(
            D((i) =>
              this.expandSegmentAgainstRoute(t, e, n, i, r, s, o).pipe(
                Ap((t) => {
                  if (t instanceof _g) return tu(null);
                  throw t;
                })
              )
            ),
            ad(),
            Ip((t) => !!t),
            Ap((t, n) => {
              if (t instanceof yp || "EmptyError" === t.name) {
                if (this.noLeftoversInUrl(e, r, s)) return tu(new xf([], {}));
                throw new _g(e);
              }
              throw t;
            })
          );
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        expandSegmentAgainstRoute(t, e, n, r, s, o, i) {
          return Eg(r) !== o
            ? bg(e)
            : void 0 === r.redirectTo
            ? this.matchSegmentAgainstRoute(t, e, r, s)
            : i && this.allowRedirects
            ? this.expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o)
            : bg(e);
        }
        expandSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o) {
          return "**" === r.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                e,
                n,
                r,
                s,
                o
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, e, n, r) {
          const s = this.applyRedirectCommands([], n.redirectTo, {});
          return n.redirectTo.startsWith("/")
            ? wg(s)
            : this.lineralizeSegments(n, s).pipe(
                z((n) => {
                  const s = new xf(n, {});
                  return this.expandSegment(t, s, e, n, r, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, e, n, r, s, o) {
          const {
            matched: i,
            consumedSegments: a,
            lastChild: l,
            positionalParamSegments: c,
          } = Sg(e, r, s);
          if (!i) return bg(e);
          const u = this.applyRedirectCommands(a, r.redirectTo, c);
          return r.redirectTo.startsWith("/")
            ? wg(u)
            : this.lineralizeSegments(r, u).pipe(
                z((r) =>
                  this.expandSegment(t, e, n, r.concat(s.slice(l)), o, !1)
                )
              );
        }
        matchSegmentAgainstRoute(t, e, n, r) {
          if ("**" === n.path)
            return n.loadChildren
              ? this.configLoader
                  .load(t.injector, n)
                  .pipe(D((t) => ((n._loadedConfig = t), new xf(r, {}))))
              : tu(new xf(r, {}));
          const { matched: s, consumedSegments: o, lastChild: i } = Sg(e, n, r);
          if (!s) return bg(e);
          const a = r.slice(i);
          return this.getChildConfig(t, n, r).pipe(
            z((t) => {
              const n = t.module,
                r = t.routes,
                { segmentGroup: s, slicedSegments: i } = (function (
                  t,
                  e,
                  n,
                  r
                ) {
                  return n.length > 0 &&
                    (function (t, e, n) {
                      return n.some((n) => kg(t, e, n) && "primary" !== Eg(n));
                    })(t, n, r)
                    ? {
                        segmentGroup: Og(
                          new xf(
                            e,
                            (function (t, e) {
                              const n = {};
                              n.primary = e;
                              for (const r of t)
                                "" === r.path &&
                                  "primary" !== Eg(r) &&
                                  (n[Eg(r)] = new xf([], {}));
                              return n;
                            })(r, new xf(n, t.children))
                          )
                        ),
                        slicedSegments: [],
                      }
                    : 0 === n.length &&
                      (function (t, e, n) {
                        return n.some((n) => kg(t, e, n));
                      })(t, n, r)
                    ? {
                        segmentGroup: Og(
                          new xf(
                            t.segments,
                            (function (t, e, n, r) {
                              const s = {};
                              for (const o of n)
                                kg(t, e, o) &&
                                  !r[Eg(o)] &&
                                  (s[Eg(o)] = new xf([], {}));
                              return Object.assign(Object.assign({}, r), s);
                            })(t, n, r, t.children)
                          )
                        ),
                        slicedSegments: n,
                      }
                    : { segmentGroup: t, slicedSegments: n };
                })(e, o, a, r);
              return 0 === i.length && s.hasChildren()
                ? this.expandChildren(n, r, s).pipe(D((t) => new xf(o, t)))
                : 0 === r.length && 0 === i.length
                ? tu(new xf(o, {}))
                : this.expandSegment(n, s, r, i, "primary", !0).pipe(
                    D((t) => new xf(o.concat(t.segments), t.children))
                  );
            })
          );
        }
        getChildConfig(t, e, n) {
          return e.children
            ? tu(new uf(e.children, t))
            : e.loadChildren
            ? void 0 !== e._loadedConfig
              ? tu(e._loadedConfig)
              : (function (t, e, n) {
                  const r = e.canLoad;
                  return r && 0 !== r.length
                    ? H(r)
                        .pipe(
                          D((r) => {
                            const s = t.get(r);
                            let o;
                            if (
                              (function (t) {
                                return t && mg(t.canLoad);
                              })(s)
                            )
                              o = s.canLoad(e, n);
                            else {
                              if (!mg(s))
                                throw new Error("Invalid CanLoad guard");
                              o = s(e, n);
                            }
                            return bf(o);
                          })
                        )
                        .pipe(
                          ad(),
                          ((s = (t) => !0 === t),
                          (t) => t.lift(new Np(s, void 0, t)))
                        )
                    : tu(!0);
                  var s;
                })(t.injector, e, n).pipe(
                  z((n) =>
                    n
                      ? this.configLoader
                          .load(t.injector, e)
                          .pipe(D((t) => ((e._loadedConfig = t), t)))
                      : (function (t) {
                          return new b((e) =>
                            e.error(
                              lf(
                                `Cannot load children because the guard of the route "path: '${t.path}'" returned false`
                              )
                            )
                          );
                        })(e)
                  )
                )
            : tu(new uf([], t));
        }
        lineralizeSegments(t, e) {
          let n = [],
            r = e.root;
          for (;;) {
            if (((n = n.concat(r.segments)), 0 === r.numberOfChildren))
              return tu(n);
            if (r.numberOfChildren > 1 || !r.children.primary)
              return Cg(t.redirectTo);
            r = r.children.primary;
          }
        }
        applyRedirectCommands(t, e, n) {
          return this.applyRedirectCreatreUrlTree(
            e,
            this.urlSerializer.parse(e),
            t,
            n
          );
        }
        applyRedirectCreatreUrlTree(t, e, n, r) {
          const s = this.createSegmentGroup(t, e.root, n, r);
          return new Cf(
            s,
            this.createQueryParams(e.queryParams, this.urlTree.queryParams),
            e.fragment
          );
        }
        createQueryParams(t, e) {
          const n = {};
          return (
            vf(t, (t, r) => {
              if ("string" == typeof t && t.startsWith(":")) {
                const s = t.substring(1);
                n[r] = e[s];
              } else n[r] = t;
            }),
            n
          );
        }
        createSegmentGroup(t, e, n, r) {
          const s = this.createSegments(t, e.segments, n, r);
          let o = {};
          return (
            vf(e.children, (e, s) => {
              o[s] = this.createSegmentGroup(t, e, n, r);
            }),
            new xf(s, o)
          );
        }
        createSegments(t, e, n, r) {
          return e.map((e) =>
            e.path.startsWith(":")
              ? this.findPosParam(t, e, r)
              : this.findOrReturn(e, n)
          );
        }
        findPosParam(t, e, n) {
          const r = n[e.path.substring(1)];
          if (!r)
            throw new Error(
              `Cannot redirect to '${t}'. Cannot find '${e.path}'.`
            );
          return r;
        }
        findOrReturn(t, e) {
          let n = 0;
          for (const r of e) {
            if (r.path === t.path) return e.splice(n), r;
            n++;
          }
          return t;
        }
      }
      function Sg(t, e, n) {
        if ("" === e.path)
          return "full" === e.pathMatch && (t.hasChildren() || n.length > 0)
            ? {
                matched: !1,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              }
            : {
                matched: !0,
                consumedSegments: [],
                lastChild: 0,
                positionalParamSegments: {},
              };
        const r = (e.matcher || cf)(n, t, e);
        return r
          ? {
              matched: !0,
              consumedSegments: r.consumed,
              lastChild: r.consumed.length,
              positionalParamSegments: r.posParams,
            }
          : {
              matched: !1,
              consumedSegments: [],
              lastChild: 0,
              positionalParamSegments: {},
            };
      }
      function Og(t) {
        if (1 === t.numberOfChildren && t.children.primary) {
          const e = t.children.primary;
          return new xf(t.segments.concat(e.segments), e.children);
        }
        return t;
      }
      function kg(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 !== n.redirectTo
        );
      }
      function Eg(t) {
        return t.outlet || "primary";
      }
      class Pg {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class Tg {
        constructor(t, e) {
          (this.component = t), (this.route = e);
        }
      }
      function Ag(t, e, n) {
        const r = t._root;
        return (function t(
          e,
          n,
          r,
          s,
          o = { canDeactivateChecks: [], canActivateChecks: [] }
        ) {
          const i = Gf(n);
          return (
            e.children.forEach((e) => {
              !(function (
                e,
                n,
                r,
                s,
                o = { canDeactivateChecks: [], canActivateChecks: [] }
              ) {
                const i = e.value,
                  a = n ? n.value : null,
                  l = r ? r.getContext(e.value.outlet) : null;
                if (a && i.routeConfig === a.routeConfig) {
                  const c = (function (t, e, n) {
                    if ("function" == typeof n) return n(t, e);
                    switch (n) {
                      case "pathParamsChange":
                        return !Of(t.url, e.url);
                      case "pathParamsOrQueryParamsChange":
                        return (
                          !Of(t.url, e.url) || !gf(t.queryParams, e.queryParams)
                        );
                      case "always":
                        return !0;
                      case "paramsOrQueryParamsChange":
                        return !ng(t, e) || !gf(t.queryParams, e.queryParams);
                      case "paramsChange":
                      default:
                        return !ng(t, e);
                    }
                  })(a, i, i.routeConfig.runGuardsAndResolvers);
                  c
                    ? o.canActivateChecks.push(new Pg(s))
                    : ((i.data = a.data), (i._resolvedData = a._resolvedData)),
                    t(e, n, i.component ? (l ? l.children : null) : r, s, o),
                    c &&
                      o.canDeactivateChecks.push(
                        new Tg((l && l.outlet && l.outlet.component) || null, a)
                      );
                } else
                  a && Rg(n, l, o),
                    o.canActivateChecks.push(new Pg(s)),
                    t(e, null, i.component ? (l ? l.children : null) : r, s, o);
              })(e, i[e.value.outlet], r, s.concat([e.value]), o),
                delete i[e.value.outlet];
            }),
            vf(i, (t, e) => Rg(t, r.getContext(e), o)),
            o
          );
        })(r, e ? e._root : null, n, [r.value]);
      }
      function Mg(t, e, n) {
        const r = (function (t) {
          if (!t) return null;
          for (let e = t.parent; e; e = e.parent) {
            const t = e.routeConfig;
            if (t && t._loadedConfig) return t._loadedConfig;
          }
          return null;
        })(e);
        return (r ? r.module.injector : n).get(t);
      }
      function Rg(t, e, n) {
        const r = Gf(t),
          s = t.value;
        vf(r, (t, r) => {
          Rg(t, s.component ? (e ? e.children.getContext(r) : null) : e, n);
        }),
          n.canDeactivateChecks.push(
            new Tg(
              s.component && e && e.outlet && e.outlet.isActivated
                ? e.outlet.component
                : null,
              s
            )
          );
      }
      const Ig = Symbol("INITIAL_VALUE");
      function Ng() {
        return cd((t) =>
          (function (...t) {
            let e = null,
              n = null;
            return (
              E(t[t.length - 1]) && (n = t.pop()),
              "function" == typeof t[t.length - 1] && (e = t.pop()),
              1 === t.length && l(t[0]) && (t = t[0]),
              G(t, n).lift(new rd(e))
            );
          })(
            ...t.map((t) =>
              t.pipe(
                _d(1),
                (function (...t) {
                  const e = t[t.length - 1];
                  return E(e) ? (t.pop(), (n) => ld(t, n, e)) : (e) => ld(t, e);
                })(Ig)
              )
            )
          ).pipe(
            jp((t, e) => {
              let n = !1;
              return e.reduce((t, r, s) => {
                if (t !== Ig) return t;
                if ((r === Ig && (n = !0), !n)) {
                  if (!1 === r) return r;
                  if (s === e.length - 1 || yg(r)) return r;
                }
                return t;
              }, t);
            }, Ig),
            nu((t) => t !== Ig),
            D((t) => (yg(t) ? t : !0 === t)),
            _d(1)
          )
        );
      }
      function Vg(t, e) {
        return null !== t && e && e(new ef(t)), tu(!0);
      }
      function jg(t, e) {
        return null !== t && e && e(new Xp(t)), tu(!0);
      }
      function Dg(t, e, n) {
        const r = e.routeConfig ? e.routeConfig.canActivate : null;
        return r && 0 !== r.length
          ? tu(
              r.map((r) =>
                _p(() => {
                  const s = Mg(r, e, n);
                  let o;
                  if (
                    (function (t) {
                      return t && mg(t.canActivate);
                    })(s)
                  )
                    o = bf(s.canActivate(e, t));
                  else {
                    if (!mg(s)) throw new Error("Invalid CanActivate guard");
                    o = bf(s(e, t));
                  }
                  return o.pipe(Ip());
                })
              )
            ).pipe(Ng())
          : tu(!0);
      }
      function Ug(t, e, n) {
        const r = e[e.length - 1],
          s = e
            .slice(0, e.length - 1)
            .reverse()
            .map((t) =>
              (function (t) {
                const e = t.routeConfig ? t.routeConfig.canActivateChild : null;
                return e && 0 !== e.length ? { node: t, guards: e } : null;
              })(t)
            )
            .filter((t) => null !== t)
            .map((e) =>
              _p(() =>
                tu(
                  e.guards.map((s) => {
                    const o = Mg(s, e.node, n);
                    let i;
                    if (
                      (function (t) {
                        return t && mg(t.canActivateChild);
                      })(o)
                    )
                      i = bf(o.canActivateChild(r, t));
                    else {
                      if (!mg(o))
                        throw new Error("Invalid CanActivateChild guard");
                      i = bf(o(r, t));
                    }
                    return i.pipe(Ip());
                  })
                ).pipe(Ng())
              )
            );
        return tu(s).pipe(Ng());
      }
      class Fg {}
      class Lg {
        constructor(t, e, n, r, s, o) {
          (this.rootComponentType = t),
            (this.config = e),
            (this.urlTree = n),
            (this.url = r),
            (this.paramsInheritanceStrategy = s),
            (this.relativeLinkResolution = o);
        }
        recognize() {
          try {
            const t = $g(
                this.urlTree.root,
                [],
                [],
                this.config,
                this.relativeLinkResolution
              ).segmentGroup,
              e = this.processSegmentGroup(this.config, t, "primary"),
              n = new Jf(
                [],
                Object.freeze({}),
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                {},
                "primary",
                this.rootComponentType,
                null,
                this.urlTree.root,
                -1,
                {}
              ),
              r = new Bf(n, e),
              s = new Yf(this.url, r);
            return this.inheritParamsAndData(s._root), tu(s);
          } catch (t) {
            return new b((e) => e.error(t));
          }
        }
        inheritParamsAndData(t) {
          const e = t.value,
            n = Kf(e, this.paramsInheritanceStrategy);
          (e.params = Object.freeze(n.params)),
            (e.data = Object.freeze(n.data)),
            t.children.forEach((t) => this.inheritParamsAndData(t));
        }
        processSegmentGroup(t, e, n) {
          return 0 === e.segments.length && e.hasChildren()
            ? this.processChildren(t, e)
            : this.processSegment(t, e, e.segments, n);
        }
        processChildren(t, e) {
          const n = kf(e, (e, n) => this.processSegmentGroup(t, e, n));
          return (
            (function (t) {
              const e = {};
              t.forEach((t) => {
                const n = e[t.value.outlet];
                if (n) {
                  const e = n.url.map((t) => t.toString()).join("/"),
                    r = t.value.url.map((t) => t.toString()).join("/");
                  throw new Error(
                    `Two segments cannot have the same outlet name: '${e}' and '${r}'.`
                  );
                }
                e[t.value.outlet] = t.value;
              });
            })(n),
            n.sort((t, e) =>
              "primary" === t.value.outlet
                ? -1
                : "primary" === e.value.outlet
                ? 1
                : t.value.outlet.localeCompare(e.value.outlet)
            ),
            n
          );
        }
        processSegment(t, e, n, r) {
          for (const o of t)
            try {
              return this.processSegmentAgainstRoute(o, e, n, r);
            } catch (s) {
              if (!(s instanceof Fg)) throw s;
            }
          if (this.noLeftoversInUrl(e, n, r)) return [];
          throw new Fg();
        }
        noLeftoversInUrl(t, e, n) {
          return 0 === e.length && !t.children[n];
        }
        processSegmentAgainstRoute(t, e, n, r) {
          if (t.redirectTo) throw new Fg();
          if ((t.outlet || "primary") !== r) throw new Fg();
          let s,
            o = [],
            i = [];
          if ("**" === t.path) {
            const o = n.length > 0 ? _f(n).parameters : {};
            s = new Jf(
              n,
              o,
              Object.freeze(Object.assign({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              Gg(t),
              r,
              t.component,
              t,
              Hg(e),
              zg(e) + n.length,
              Wg(t)
            );
          } else {
            const a = (function (t, e, n) {
              if ("" === e.path) {
                if ("full" === e.pathMatch && (t.hasChildren() || n.length > 0))
                  throw new Fg();
                return { consumedSegments: [], lastChild: 0, parameters: {} };
              }
              const r = (e.matcher || cf)(n, t, e);
              if (!r) throw new Fg();
              const s = {};
              vf(r.posParams, (t, e) => {
                s[e] = t.path;
              });
              const o =
                r.consumed.length > 0
                  ? Object.assign(
                      Object.assign({}, s),
                      r.consumed[r.consumed.length - 1].parameters
                    )
                  : s;
              return {
                consumedSegments: r.consumed,
                lastChild: r.consumed.length,
                parameters: o,
              };
            })(e, t, n);
            (o = a.consumedSegments),
              (i = n.slice(a.lastChild)),
              (s = new Jf(
                o,
                a.parameters,
                Object.freeze(Object.assign({}, this.urlTree.queryParams)),
                this.urlTree.fragment,
                Gg(t),
                r,
                t.component,
                t,
                Hg(e),
                zg(e) + o.length,
                Wg(t)
              ));
          }
          const a = (function (t) {
              return t.children
                ? t.children
                : t.loadChildren
                ? t._loadedConfig.routes
                : [];
            })(t),
            { segmentGroup: l, slicedSegments: c } = $g(
              e,
              o,
              i,
              a,
              this.relativeLinkResolution
            );
          if (0 === c.length && l.hasChildren()) {
            const t = this.processChildren(a, l);
            return [new Bf(s, t)];
          }
          if (0 === a.length && 0 === c.length) return [new Bf(s, [])];
          const u = this.processSegment(a, l, c, "primary");
          return [new Bf(s, u)];
        }
      }
      function Hg(t) {
        let e = t;
        for (; e._sourceSegment; ) e = e._sourceSegment;
        return e;
      }
      function zg(t) {
        let e = t,
          n = e._segmentIndexShift ? e._segmentIndexShift : 0;
        for (; e._sourceSegment; )
          (e = e._sourceSegment),
            (n += e._segmentIndexShift ? e._segmentIndexShift : 0);
        return n - 1;
      }
      function $g(t, e, n, r, s) {
        if (
          n.length > 0 &&
          (function (t, e, n) {
            return n.some((n) => qg(t, e, n) && "primary" !== Bg(n));
          })(t, n, r)
        ) {
          const s = new xf(
            e,
            (function (t, e, n, r) {
              const s = {};
              (s.primary = r),
                (r._sourceSegment = t),
                (r._segmentIndexShift = e.length);
              for (const o of n)
                if ("" === o.path && "primary" !== Bg(o)) {
                  const n = new xf([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift = e.length),
                    (s[Bg(o)] = n);
                }
              return s;
            })(t, e, r, new xf(n, t.children))
          );
          return (
            (s._sourceSegment = t),
            (s._segmentIndexShift = e.length),
            { segmentGroup: s, slicedSegments: [] }
          );
        }
        if (
          0 === n.length &&
          (function (t, e, n) {
            return n.some((n) => qg(t, e, n));
          })(t, n, r)
        ) {
          const o = new xf(
            t.segments,
            (function (t, e, n, r, s, o) {
              const i = {};
              for (const a of r)
                if (qg(t, n, a) && !s[Bg(a)]) {
                  const n = new xf([], {});
                  (n._sourceSegment = t),
                    (n._segmentIndexShift =
                      "legacy" === o ? t.segments.length : e.length),
                    (i[Bg(a)] = n);
                }
              return Object.assign(Object.assign({}, s), i);
            })(t, e, n, r, t.children, s)
          );
          return (
            (o._sourceSegment = t),
            (o._segmentIndexShift = e.length),
            { segmentGroup: o, slicedSegments: n }
          );
        }
        const o = new xf(t.segments, t.children);
        return (
          (o._sourceSegment = t),
          (o._segmentIndexShift = e.length),
          { segmentGroup: o, slicedSegments: n }
        );
      }
      function qg(t, e, n) {
        return (
          (!(t.hasChildren() || e.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path &&
          void 0 === n.redirectTo
        );
      }
      function Bg(t) {
        return t.outlet || "primary";
      }
      function Gg(t) {
        return t.data || {};
      }
      function Wg(t) {
        return t.resolve || {};
      }
      function Zg(t, e, n, r) {
        const s = Mg(t, e, r);
        return bf(s.resolve ? s.resolve(e, n) : s(e, n));
      }
      function Qg(t) {
        return function (e) {
          return e.pipe(
            cd((e) => {
              const n = t(e);
              return n ? H(n).pipe(D(() => e)) : H([e]);
            })
          );
        };
      }
      class Kg {
        shouldDetach(t) {
          return !1;
        }
        store(t, e) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, e) {
          return t.routeConfig === e.routeConfig;
        }
      }
      const Jg = new Dt("ROUTES");
      class Yg {
        constructor(t, e, n, r) {
          (this.loader = t),
            (this.compiler = e),
            (this.onLoadStartListener = n),
            (this.onLoadEndListener = r);
        }
        load(t, e) {
          return (
            this.onLoadStartListener && this.onLoadStartListener(e),
            this.loadModuleFactory(e.loadChildren).pipe(
              D((n) => {
                this.onLoadEndListener && this.onLoadEndListener(e);
                const r = n.create(t);
                return new uf(yf(r.injector.get(Jg)).map(ff), r);
              })
            )
          );
        }
        loadModuleFactory(t) {
          return "string" == typeof t
            ? H(this.loader.load(t))
            : bf(t()).pipe(
                z((t) =>
                  t instanceof Yt
                    ? tu(t)
                    : H(this.compiler.compileModuleAsync(t))
                )
              );
        }
      }
      class Xg {
        shouldProcessUrl(t) {
          return !0;
        }
        extract(t) {
          return t;
        }
        merge(t, e) {
          return t;
        }
      }
      function tm(t) {
        throw t;
      }
      function em(t, e, n) {
        return e.parse("/");
      }
      function nm(t, e) {
        return tu(null);
      }
      let rm = (() => {
          class t {
            constructor(t, e, n, r, s, o, i, a) {
              (this.rootComponentType = t),
                (this.urlSerializer = e),
                (this.rootContexts = n),
                (this.location = r),
                (this.config = a),
                (this.lastSuccessfulNavigation = null),
                (this.currentNavigation = null),
                (this.navigationId = 0),
                (this.isNgZoneEnabled = !1),
                (this.events = new O()),
                (this.errorHandler = tm),
                (this.malformedUriErrorHandler = em),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1),
                (this.hooks = {
                  beforePreactivation: nm,
                  afterPreactivation: nm,
                }),
                (this.urlHandlingStrategy = new Xg()),
                (this.routeReuseStrategy = new Kg()),
                (this.onSameUrlNavigation = "ignore"),
                (this.paramsInheritanceStrategy = "emptyOnly"),
                (this.urlUpdateStrategy = "deferred"),
                (this.relativeLinkResolution = "legacy"),
                (this.ngModule = s.get(Jt)),
                (this.console = s.get(nl));
              const l = s.get(ml);
              (this.isNgZoneEnabled = l instanceof ml),
                this.resetConfig(a),
                (this.currentUrlTree = new Cf(new xf([], {}), {}, null)),
                (this.rawUrlTree = this.currentUrlTree),
                (this.browserUrlTree = this.currentUrlTree),
                (this.configLoader = new Yg(
                  o,
                  i,
                  (t) => this.triggerEvent(new Jp(t)),
                  (t) => this.triggerEvent(new Yp(t))
                )),
                (this.routerState = Zf(
                  this.currentUrlTree,
                  this.rootComponentType
                )),
                (this.transitions = new ed({
                  id: 0,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.currentUrlTree,
                  extractedUrl: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  urlAfterRedirects: this.urlHandlingStrategy.extract(
                    this.currentUrlTree
                  ),
                  rawUrl: this.currentUrlTree,
                  extras: {},
                  resolve: null,
                  reject: null,
                  promise: Promise.resolve(!0),
                  source: "imperative",
                  restoredState: null,
                  currentSnapshot: this.routerState.snapshot,
                  targetSnapshot: null,
                  currentRouterState: this.routerState,
                  targetRouterState: null,
                  guards: { canActivateChecks: [], canDeactivateChecks: [] },
                  guardsResult: null,
                })),
                (this.navigations = this.setupNavigations(this.transitions)),
                this.processNavigations();
            }
            setupNavigations(t) {
              const e = this.events;
              return t.pipe(
                nu((t) => 0 !== t.id),
                D((t) =>
                  Object.assign(Object.assign({}, t), {
                    extractedUrl: this.urlHandlingStrategy.extract(t.rawUrl),
                  })
                ),
                cd((t) => {
                  let n = !1,
                    r = !1;
                  return tu(t).pipe(
                    wd((t) => {
                      this.currentNavigation = {
                        id: t.id,
                        initialUrl: t.currentRawUrl,
                        extractedUrl: t.extractedUrl,
                        trigger: t.source,
                        extras: t.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? Object.assign(
                              Object.assign({}, this.lastSuccessfulNavigation),
                              { previousNavigation: null }
                            )
                          : null,
                      };
                    }),
                    cd((t) => {
                      const n =
                        !this.navigated ||
                        t.extractedUrl.toString() !==
                          this.browserUrlTree.toString();
                      if (
                        ("reload" === this.onSameUrlNavigation || n) &&
                        this.urlHandlingStrategy.shouldProcessUrl(t.rawUrl)
                      )
                        return tu(t).pipe(
                          cd((t) => {
                            const n = this.transitions.getValue();
                            return (
                              e.next(
                                new zp(
                                  t.id,
                                  this.serializeUrl(t.extractedUrl),
                                  t.source,
                                  t.restoredState
                                )
                              ),
                              n !== this.transitions.getValue() ? md : [t]
                            );
                          }),
                          cd((t) => Promise.resolve(t)),
                          ((r = this.ngModule.injector),
                          (s = this.configLoader),
                          (o = this.urlSerializer),
                          (i = this.config),
                          function (t) {
                            return t.pipe(
                              cd((t) =>
                                (function (t, e, n, r, s) {
                                  return new xg(t, e, n, r, s).apply();
                                })(r, s, o, t.extractedUrl, i).pipe(
                                  D((e) =>
                                    Object.assign(Object.assign({}, t), {
                                      urlAfterRedirects: e,
                                    })
                                  )
                                )
                              )
                            );
                          }),
                          wd((t) => {
                            this.currentNavigation = Object.assign(
                              Object.assign({}, this.currentNavigation),
                              { finalUrl: t.urlAfterRedirects }
                            );
                          }),
                          (function (t, e, n, r, s) {
                            return function (o) {
                              return o.pipe(
                                z((o) =>
                                  (function (
                                    t,
                                    e,
                                    n,
                                    r,
                                    s = "emptyOnly",
                                    o = "legacy"
                                  ) {
                                    return new Lg(t, e, n, r, s, o).recognize();
                                  })(
                                    t,
                                    e,
                                    o.urlAfterRedirects,
                                    n(o.urlAfterRedirects),
                                    r,
                                    s
                                  ).pipe(
                                    D((t) =>
                                      Object.assign(Object.assign({}, o), {
                                        targetSnapshot: t,
                                      })
                                    )
                                  )
                                )
                              );
                            };
                          })(
                            this.rootComponentType,
                            this.config,
                            (t) => this.serializeUrl(t),
                            this.paramsInheritanceStrategy,
                            this.relativeLinkResolution
                          ),
                          wd((t) => {
                            "eager" === this.urlUpdateStrategy &&
                              (t.extras.skipLocationChange ||
                                this.setBrowserUrl(
                                  t.urlAfterRedirects,
                                  !!t.extras.replaceUrl,
                                  t.id,
                                  t.extras.state
                                ),
                              (this.browserUrlTree = t.urlAfterRedirects));
                          }),
                          wd((t) => {
                            const n = new Gp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            e.next(n);
                          })
                        );
                      var r, s, o, i;
                      if (
                        n &&
                        this.rawUrlTree &&
                        this.urlHandlingStrategy.shouldProcessUrl(
                          this.rawUrlTree
                        )
                      ) {
                        const {
                            id: n,
                            extractedUrl: r,
                            source: s,
                            restoredState: o,
                            extras: i,
                          } = t,
                          a = new zp(n, this.serializeUrl(r), s, o);
                        e.next(a);
                        const l = Zf(r, this.rootComponentType).snapshot;
                        return tu(
                          Object.assign(Object.assign({}, t), {
                            targetSnapshot: l,
                            urlAfterRedirects: r,
                            extras: Object.assign(Object.assign({}, i), {
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            }),
                          })
                        );
                      }
                      return (
                        (this.rawUrlTree = t.rawUrl),
                        (this.browserUrlTree = t.urlAfterRedirects),
                        t.resolve(null),
                        md
                      );
                    }),
                    Qg((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: o, replaceUrl: i },
                      } = t;
                      return this.hooks.beforePreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!o,
                        replaceUrl: !!i,
                      });
                    }),
                    wd((t) => {
                      const e = new Wp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot
                      );
                      this.triggerEvent(e);
                    }),
                    D((t) =>
                      Object.assign(Object.assign({}, t), {
                        guards: Ag(
                          t.targetSnapshot,
                          t.currentSnapshot,
                          this.rootContexts
                        ),
                      })
                    ),
                    (function (t, e) {
                      return function (n) {
                        return n.pipe(
                          z((n) => {
                            const {
                              targetSnapshot: r,
                              currentSnapshot: s,
                              guards: {
                                canActivateChecks: o,
                                canDeactivateChecks: i,
                              },
                            } = n;
                            return 0 === i.length && 0 === o.length
                              ? tu(
                                  Object.assign(Object.assign({}, n), {
                                    guardsResult: !0,
                                  })
                                )
                              : (function (t, e, n, r) {
                                  return H(t).pipe(
                                    z((t) =>
                                      (function (t, e, n, r, s) {
                                        const o =
                                          e && e.routeConfig
                                            ? e.routeConfig.canDeactivate
                                            : null;
                                        return o && 0 !== o.length
                                          ? tu(
                                              o.map((o) => {
                                                const i = Mg(o, e, s);
                                                let a;
                                                if (
                                                  (function (t) {
                                                    return (
                                                      t && mg(t.canDeactivate)
                                                    );
                                                  })(i)
                                                )
                                                  a = bf(
                                                    i.canDeactivate(t, e, n, r)
                                                  );
                                                else {
                                                  if (!mg(i))
                                                    throw new Error(
                                                      "Invalid CanDeactivate guard"
                                                    );
                                                  a = bf(i(t, e, n, r));
                                                }
                                                return a.pipe(Ip());
                                              })
                                            ).pipe(Ng())
                                          : tu(!0);
                                      })(t.component, t.route, n, e, r)
                                    ),
                                    Ip((t) => !0 !== t, !0)
                                  );
                                })(i, r, s, t).pipe(
                                  z((n) =>
                                    n && "boolean" == typeof n
                                      ? (function (t, e, n, r) {
                                          return H(e).pipe(
                                            eu((e) =>
                                              H([
                                                jg(e.route.parent, r),
                                                Vg(e.route, r),
                                                Ug(t, e.path, n),
                                                Dg(t, e.route, n),
                                              ]).pipe(
                                                ad(),
                                                Ip((t) => !0 !== t, !0)
                                              )
                                            ),
                                            Ip((t) => !0 !== t, !0)
                                          );
                                        })(r, o, t, e)
                                      : tu(n)
                                  ),
                                  D((t) =>
                                    Object.assign(Object.assign({}, n), {
                                      guardsResult: t,
                                    })
                                  )
                                );
                          })
                        );
                      };
                    })(this.ngModule.injector, (t) => this.triggerEvent(t)),
                    wd((t) => {
                      if (yg(t.guardsResult)) {
                        const e = lf(
                          `Redirecting to "${this.serializeUrl(
                            t.guardsResult
                          )}"`
                        );
                        throw ((e.url = t.guardsResult), e);
                      }
                    }),
                    wd((t) => {
                      const e = new Zp(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(t.urlAfterRedirects),
                        t.targetSnapshot,
                        !!t.guardsResult
                      );
                      this.triggerEvent(e);
                    }),
                    nu((t) => {
                      if (!t.guardsResult) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new qp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          ""
                        );
                        return e.next(n), t.resolve(!1), !1;
                      }
                      return !0;
                    }),
                    Qg((t) => {
                      if (t.guards.canActivateChecks.length)
                        return tu(t).pipe(
                          wd((t) => {
                            const e = new Qp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          }),
                          ((e = this.paramsInheritanceStrategy),
                          (n = this.ngModule.injector),
                          function (t) {
                            return t.pipe(
                              z((t) => {
                                const {
                                  targetSnapshot: r,
                                  guards: { canActivateChecks: s },
                                } = t;
                                return s.length
                                  ? H(s).pipe(
                                      eu((t) =>
                                        (function (t, e, n, r) {
                                          return (function (t, e, n, r) {
                                            const s = Object.keys(t);
                                            if (0 === s.length) return tu({});
                                            if (1 === s.length) {
                                              const o = s[0];
                                              return Zg(t[o], e, n, r).pipe(
                                                D((t) => ({ [o]: t }))
                                              );
                                            }
                                            const o = {};
                                            return H(s)
                                              .pipe(
                                                z((s) =>
                                                  Zg(t[s], e, n, r).pipe(
                                                    D((t) => ((o[s] = t), t))
                                                  )
                                                )
                                              )
                                              .pipe(
                                                Tp(),
                                                D(() => o)
                                              );
                                          })(t._resolve, t, e, r).pipe(
                                            D(
                                              (e) => (
                                                (t._resolvedData = e),
                                                (t.data = Object.assign(
                                                  Object.assign({}, t.data),
                                                  Kf(t, n).resolve
                                                )),
                                                null
                                              )
                                            )
                                          );
                                        })(t.route, r, e, n)
                                      ),
                                      (function (t, e) {
                                        return arguments.length >= 2
                                          ? function (n) {
                                              return _(
                                                jp(t, e),
                                                vp(1),
                                                kp(e)
                                              )(n);
                                            }
                                          : function (e) {
                                              return _(
                                                jp((e, n, r) => t(e, n, r + 1)),
                                                vp(1)
                                              )(e);
                                            };
                                      })((t, e) => t),
                                      D((e) => t)
                                    )
                                  : tu(t);
                              })
                            );
                          }),
                          wd((t) => {
                            const e = new Kp(
                              t.id,
                              this.serializeUrl(t.extractedUrl),
                              this.serializeUrl(t.urlAfterRedirects),
                              t.targetSnapshot
                            );
                            this.triggerEvent(e);
                          })
                        );
                      var e, n;
                    }),
                    Qg((t) => {
                      const {
                        targetSnapshot: e,
                        id: n,
                        extractedUrl: r,
                        rawUrl: s,
                        extras: { skipLocationChange: o, replaceUrl: i },
                      } = t;
                      return this.hooks.afterPreactivation(e, {
                        navigationId: n,
                        appliedUrlTree: r,
                        rawUrlTree: s,
                        skipLocationChange: !!o,
                        replaceUrl: !!i,
                      });
                    }),
                    D((t) => {
                      const e = (function (t, e, n) {
                        const r = (function t(e, n, r) {
                          if (
                            r &&
                            e.shouldReuseRoute(n.value, r.value.snapshot)
                          ) {
                            const s = r.value;
                            s._futureSnapshot = n.value;
                            const o = (function (e, n, r) {
                              return n.children.map((n) => {
                                for (const s of r.children)
                                  if (
                                    e.shouldReuseRoute(
                                      s.value.snapshot,
                                      n.value
                                    )
                                  )
                                    return t(e, n, s);
                                return t(e, n);
                              });
                            })(e, n, r);
                            return new Bf(s, o);
                          }
                          {
                            const r = e.retrieve(n.value);
                            if (r) {
                              const t = r.route;
                              return (
                                (function t(e, n) {
                                  if (
                                    e.value.routeConfig !== n.value.routeConfig
                                  )
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot created from a different route"
                                    );
                                  if (e.children.length !== n.children.length)
                                    throw new Error(
                                      "Cannot reattach ActivatedRouteSnapshot with a different number of children"
                                    );
                                  n.value._futureSnapshot = e.value;
                                  for (let r = 0; r < e.children.length; ++r)
                                    t(e.children[r], n.children[r]);
                                })(n, t),
                                t
                              );
                            }
                            {
                              const r = new Qf(
                                  new ed((s = n.value).url),
                                  new ed(s.params),
                                  new ed(s.queryParams),
                                  new ed(s.fragment),
                                  new ed(s.data),
                                  s.outlet,
                                  s.component,
                                  s
                                ),
                                o = n.children.map((n) => t(e, n));
                              return new Bf(r, o);
                            }
                          }
                          var s;
                        })(t, e._root, n ? n._root : void 0);
                        return new Wf(r, e);
                      })(
                        this.routeReuseStrategy,
                        t.targetSnapshot,
                        t.currentRouterState
                      );
                      return Object.assign(Object.assign({}, t), {
                        targetRouterState: e,
                      });
                    }),
                    wd((t) => {
                      (this.currentUrlTree = t.urlAfterRedirects),
                        (this.rawUrlTree = this.urlHandlingStrategy.merge(
                          this.currentUrlTree,
                          t.rawUrl
                        )),
                        (this.routerState = t.targetRouterState),
                        "deferred" === this.urlUpdateStrategy &&
                          (t.extras.skipLocationChange ||
                            this.setBrowserUrl(
                              this.rawUrlTree,
                              !!t.extras.replaceUrl,
                              t.id,
                              t.extras.state
                            ),
                          (this.browserUrlTree = t.urlAfterRedirects));
                    }),
                    ((o = this.rootContexts),
                    (i = this.routeReuseStrategy),
                    (a = (t) => this.triggerEvent(t)),
                    D(
                      (t) => (
                        new fg(
                          i,
                          t.targetRouterState,
                          t.currentRouterState,
                          a
                        ).activate(o),
                        t
                      )
                    )),
                    wd({
                      next() {
                        n = !0;
                      },
                      complete() {
                        n = !0;
                      },
                    }),
                    ((s = () => {
                      if (!n && !r) {
                        this.resetUrlToCurrentUrlTree();
                        const n = new qp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          `Navigation ID ${t.id} is not equal to the current navigation id ${this.navigationId}`
                        );
                        e.next(n), t.resolve(!1);
                      }
                      this.currentNavigation = null;
                    }),
                    (t) => t.lift(new Fp(s))),
                    Ap((n) => {
                      if (((r = !0), (s = n) && s.ngNavigationCancelingError)) {
                        const r = yg(n.url);
                        r ||
                          ((this.navigated = !0),
                          this.resetStateAndUrl(
                            t.currentRouterState,
                            t.currentUrlTree,
                            t.rawUrl
                          ));
                        const s = new qp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n.message
                        );
                        e.next(s),
                          r
                            ? setTimeout(() => {
                                const e = this.urlHandlingStrategy.merge(
                                  n.url,
                                  this.rawUrlTree
                                );
                                return this.scheduleNavigation(
                                  e,
                                  "imperative",
                                  null,
                                  {
                                    skipLocationChange:
                                      t.extras.skipLocationChange,
                                    replaceUrl:
                                      "eager" === this.urlUpdateStrategy,
                                  },
                                  {
                                    resolve: t.resolve,
                                    reject: t.reject,
                                    promise: t.promise,
                                  }
                                );
                              }, 0)
                            : t.resolve(!1);
                      } else {
                        this.resetStateAndUrl(
                          t.currentRouterState,
                          t.currentUrlTree,
                          t.rawUrl
                        );
                        const r = new Bp(
                          t.id,
                          this.serializeUrl(t.extractedUrl),
                          n
                        );
                        e.next(r);
                        try {
                          t.resolve(this.errorHandler(n));
                        } catch (o) {
                          t.reject(o);
                        }
                      }
                      var s;
                      return md;
                    })
                  );
                  var s, o, i, a;
                })
              );
            }
            resetRootComponentType(t) {
              (this.rootComponentType = t),
                (this.routerState.root.component = this.rootComponentType);
            }
            getTransition() {
              const t = this.transitions.value;
              return (t.urlAfterRedirects = this.browserUrlTree), t;
            }
            setTransition(t) {
              this.transitions.next(
                Object.assign(Object.assign({}, this.getTransition()), t)
              );
            }
            initialNavigation() {
              this.setUpLocationChangeListener(),
                0 === this.navigationId &&
                  this.navigateByUrl(this.location.path(!0), {
                    replaceUrl: !0,
                  });
            }
            setUpLocationChangeListener() {
              this.locationSubscription ||
                (this.locationSubscription = this.location.subscribe((t) => {
                  let e = this.parseUrl(t.url);
                  const n = "popstate" === t.type ? "popstate" : "hashchange",
                    r = t.state && t.state.navigationId ? t.state : null;
                  setTimeout(() => {
                    this.scheduleNavigation(e, n, r, { replaceUrl: !0 });
                  }, 0);
                }));
            }
            get url() {
              return this.serializeUrl(this.currentUrlTree);
            }
            getCurrentNavigation() {
              return this.currentNavigation;
            }
            triggerEvent(t) {
              this.events.next(t);
            }
            resetConfig(t) {
              hf(t),
                (this.config = t.map(ff)),
                (this.navigated = !1),
                (this.lastSuccessfulId = -1);
            }
            ngOnDestroy() {
              this.dispose();
            }
            dispose() {
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = null));
            }
            createUrlTree(t, e = {}) {
              const {
                relativeTo: n,
                queryParams: r,
                fragment: s,
                preserveQueryParams: o,
                queryParamsHandling: i,
                preserveFragment: a,
              } = e;
              ar() &&
                o &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                );
              const l = n || this.routerState.root,
                c = a ? this.currentUrlTree.fragment : s;
              let u = null;
              if (i)
                switch (i) {
                  case "merge":
                    u = Object.assign(
                      Object.assign({}, this.currentUrlTree.queryParams),
                      r
                    );
                    break;
                  case "preserve":
                    u = this.currentUrlTree.queryParams;
                    break;
                  default:
                    u = r || null;
                }
              else u = o ? this.currentUrlTree.queryParams : r || null;
              return (
                null !== u && (u = this.removeEmptyProps(u)),
                (function (t, e, n, r, s) {
                  if (0 === n.length) return sg(e.root, e.root, e, r, s);
                  const o = (function (t) {
                    if (
                      "string" == typeof t[0] &&
                      1 === t.length &&
                      "/" === t[0]
                    )
                      return new og(!0, 0, t);
                    let e = 0,
                      n = !1;
                    const r = t.reduce((t, r, s) => {
                      if ("object" == typeof r && null != r) {
                        if (r.outlets) {
                          const e = {};
                          return (
                            vf(r.outlets, (t, n) => {
                              e[n] = "string" == typeof t ? t.split("/") : t;
                            }),
                            [...t, { outlets: e }]
                          );
                        }
                        if (r.segmentPath) return [...t, r.segmentPath];
                      }
                      return "string" != typeof r
                        ? [...t, r]
                        : 0 === s
                        ? (r.split("/").forEach((r, s) => {
                            (0 == s && "." === r) ||
                              (0 == s && "" === r
                                ? (n = !0)
                                : ".." === r
                                ? e++
                                : "" != r && t.push(r));
                          }),
                          t)
                        : [...t, r];
                    }, []);
                    return new og(n, e, r);
                  })(n);
                  if (o.toRoot()) return sg(e.root, new xf([], {}), e, r, s);
                  const i = (function (t, e, n) {
                      if (t.isAbsolute) return new ig(e.root, !0, 0);
                      if (-1 === n.snapshot._lastPathIndex)
                        return new ig(n.snapshot._urlSegment, !0, 0);
                      const r = rg(t.commands[0]) ? 0 : 1;
                      return (function (t, e, n) {
                        let r = t,
                          s = e,
                          o = n;
                        for (; o > s; ) {
                          if (((o -= s), (r = r.parent), !r))
                            throw new Error("Invalid number of '../'");
                          s = r.segments.length;
                        }
                        return new ig(r, !1, s - o);
                      })(
                        n.snapshot._urlSegment,
                        n.snapshot._lastPathIndex + r,
                        t.numberOfDoubleDots
                      );
                    })(o, e, t),
                    a = i.processChildren
                      ? cg(i.segmentGroup, i.index, o.commands)
                      : lg(i.segmentGroup, i.index, o.commands);
                  return sg(i.segmentGroup, a, e, r, s);
                })(l, this.currentUrlTree, t, u, c)
              );
            }
            navigateByUrl(t, e = { skipLocationChange: !1 }) {
              ar() &&
                this.isNgZoneEnabled &&
                !ml.isInAngularZone() &&
                this.console.warn(
                  "Navigation triggered outside Angular zone, did you forget to call 'ngZone.run()'?"
                );
              const n = yg(t) ? t : this.parseUrl(t),
                r = this.urlHandlingStrategy.merge(n, this.rawUrlTree);
              return this.scheduleNavigation(r, "imperative", null, e);
            }
            navigate(t, e = { skipLocationChange: !1 }) {
              return (
                (function (t) {
                  for (let e = 0; e < t.length; e++) {
                    const n = t[e];
                    if (null == n)
                      throw new Error(
                        `The requested path contains ${n} segment at index ${e}`
                      );
                  }
                })(t),
                this.navigateByUrl(this.createUrlTree(t, e), e)
              );
            }
            serializeUrl(t) {
              return this.urlSerializer.serialize(t);
            }
            parseUrl(t) {
              let e;
              try {
                e = this.urlSerializer.parse(t);
              } catch (n) {
                e = this.malformedUriErrorHandler(n, this.urlSerializer, t);
              }
              return e;
            }
            isActive(t, e) {
              if (yg(t)) return wf(this.currentUrlTree, t, e);
              const n = this.parseUrl(t);
              return wf(this.currentUrlTree, n, e);
            }
            removeEmptyProps(t) {
              return Object.keys(t).reduce((e, n) => {
                const r = t[n];
                return null != r && (e[n] = r), e;
              }, {});
            }
            processNavigations() {
              this.navigations.subscribe(
                (t) => {
                  (this.navigated = !0),
                    (this.lastSuccessfulId = t.id),
                    this.events.next(
                      new $p(
                        t.id,
                        this.serializeUrl(t.extractedUrl),
                        this.serializeUrl(this.currentUrlTree)
                      )
                    ),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    (this.currentNavigation = null),
                    t.resolve(!0);
                },
                (t) => {
                  this.console.warn("Unhandled Navigation Error: ");
                }
              );
            }
            scheduleNavigation(t, e, n, r, s) {
              const o = this.getTransition();
              if (
                o &&
                "imperative" !== e &&
                "imperative" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "hashchange" == e &&
                "popstate" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              if (
                o &&
                "popstate" == e &&
                "hashchange" === o.source &&
                o.rawUrl.toString() === t.toString()
              )
                return Promise.resolve(!0);
              let i, a, l;
              s
                ? ((i = s.resolve), (a = s.reject), (l = s.promise))
                : (l = new Promise((t, e) => {
                    (i = t), (a = e);
                  }));
              const c = ++this.navigationId;
              return (
                this.setTransition({
                  id: c,
                  source: e,
                  restoredState: n,
                  currentUrlTree: this.currentUrlTree,
                  currentRawUrl: this.rawUrlTree,
                  rawUrl: t,
                  extras: r,
                  resolve: i,
                  reject: a,
                  promise: l,
                  currentSnapshot: this.routerState.snapshot,
                  currentRouterState: this.routerState,
                }),
                l.catch((t) => Promise.reject(t))
              );
            }
            setBrowserUrl(t, e, n, r) {
              const s = this.urlSerializer.serialize(t);
              (r = r || {}),
                this.location.isCurrentPathEqualTo(s) || e
                  ? this.location.replaceState(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    )
                  : this.location.go(
                      s,
                      "",
                      Object.assign(Object.assign({}, r), { navigationId: n })
                    );
            }
            resetStateAndUrl(t, e, n) {
              (this.routerState = t),
                (this.currentUrlTree = e),
                (this.rawUrlTree = this.urlHandlingStrategy.merge(
                  this.currentUrlTree,
                  n
                )),
                this.resetUrlToCurrentUrlTree();
            }
            resetUrlToCurrentUrlTree() {
              this.location.replaceState(
                this.urlSerializer.serialize(this.rawUrlTree),
                "",
                { navigationId: this.lastSuccessfulId }
              );
            }
          }
          return (
            (t.ɵfac = function (t) {
              Vo();
            }),
            (t.ɵdir = ye({ type: t })),
            t
          );
        })(),
        sm = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.route = e),
                (this.commands = []),
                null == n && r.setAttribute(s.nativeElement, "tabindex", "0");
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              ar() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated!, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            onClick() {
              const t = {
                skipLocationChange: im(this.skipLocationChange),
                replaceUrl: im(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, t), !0;
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: im(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: im(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(
                Io(rm),
                Io(Qf),
                No("tabindex"),
                Io(qi),
                Io(Li)
              );
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [["", "routerLink", "", 5, "a", 5, "area"]],
              hostBindings: function (t, e) {
                1 & t &&
                  qo("click", function () {
                    return e.onClick();
                  });
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
            })),
            t
          );
        })(),
        om = (() => {
          class t {
            constructor(t, e, n) {
              (this.router = t),
                (this.route = e),
                (this.locationStrategy = n),
                (this.commands = []),
                (this.subscription = t.events.subscribe((t) => {
                  t instanceof $p && this.updateTargetUrlAndHref();
                }));
            }
            set routerLink(t) {
              this.commands = null != t ? (Array.isArray(t) ? t : [t]) : [];
            }
            set preserveQueryParams(t) {
              ar() &&
                console &&
                console.warn &&
                console.warn(
                  "preserveQueryParams is deprecated, use queryParamsHandling instead."
                ),
                (this.preserve = t);
            }
            ngOnChanges(t) {
              this.updateTargetUrlAndHref();
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            onClick(t, e, n, r) {
              if (0 !== t || e || n || r) return !0;
              if ("string" == typeof this.target && "_self" != this.target)
                return !0;
              const s = {
                skipLocationChange: im(this.skipLocationChange),
                replaceUrl: im(this.replaceUrl),
                state: this.state,
              };
              return this.router.navigateByUrl(this.urlTree, s), !1;
            }
            updateTargetUrlAndHref() {
              this.href = this.locationStrategy.prepareExternalUrl(
                this.router.serializeUrl(this.urlTree)
              );
            }
            get urlTree() {
              return this.router.createUrlTree(this.commands, {
                relativeTo: this.route,
                queryParams: this.queryParams,
                fragment: this.fragment,
                preserveQueryParams: im(this.preserve),
                queryParamsHandling: this.queryParamsHandling,
                preserveFragment: im(this.preserveFragment),
              });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(rm), Io(Qf), Io(sc));
            }),
            (t.ɵdir = ye({
              type: t,
              selectors: [
                ["a", "routerLink", ""],
                ["area", "routerLink", ""],
              ],
              hostVars: 2,
              hostBindings: function (t, e) {
                1 & t &&
                  qo("click", function (t) {
                    return e.onClick(
                      t.button,
                      t.ctrlKey,
                      t.metaKey,
                      t.shiftKey
                    );
                  }),
                  2 & t && (_i("href", e.href, hr), To("target", e.target));
              },
              inputs: {
                routerLink: "routerLink",
                preserveQueryParams: "preserveQueryParams",
                target: "target",
                queryParams: "queryParams",
                fragment: "fragment",
                queryParamsHandling: "queryParamsHandling",
                preserveFragment: "preserveFragment",
                skipLocationChange: "skipLocationChange",
                replaceUrl: "replaceUrl",
                state: "state",
              },
              features: [ki],
            })),
            t
          );
        })();
      function im(t) {
        return "" === t || !!t;
      }
      class am {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.resolver = null),
            (this.children = new lm()),
            (this.attachRef = null);
        }
      }
      class lm {
        constructor() {
          this.contexts = new Map();
        }
        onChildOutletCreated(t, e) {
          const n = this.getOrCreateContext(t);
          (n.outlet = e), this.contexts.set(t, n);
        }
        onChildOutletDestroyed(t) {
          const e = this.getContext(t);
          e && (e.outlet = null);
        }
        onOutletDeactivated() {
          const t = this.contexts;
          return (this.contexts = new Map()), t;
        }
        onOutletReAttached(t) {
          this.contexts = t;
        }
        getOrCreateContext(t) {
          let e = this.getContext(t);
          return e || ((e = new am()), this.contexts.set(t, e)), e;
        }
        getContext(t) {
          return this.contexts.get(t) || null;
        }
      }
      let cm = (() => {
        class t {
          constructor(t, e, n, r, s) {
            (this.parentContexts = t),
              (this.location = e),
              (this.resolver = n),
              (this.changeDetector = s),
              (this.activated = null),
              (this._activatedRoute = null),
              (this.activateEvents = new Aa()),
              (this.deactivateEvents = new Aa()),
              (this.name = r || "primary"),
              t.onChildOutletCreated(this.name, this);
          }
          ngOnDestroy() {
            this.parentContexts.onChildOutletDestroyed(this.name);
          }
          ngOnInit() {
            if (!this.activated) {
              const t = this.parentContexts.getContext(this.name);
              t &&
                t.route &&
                (t.attachRef
                  ? this.attach(t.attachRef, t.route)
                  : this.activateWith(t.route, t.resolver || null));
            }
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new Error("Outlet is not activated");
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new Error("Outlet is not activated");
            this.location.detach();
            const t = this.activated;
            return (this.activated = null), (this._activatedRoute = null), t;
          }
          attach(t, e) {
            (this.activated = t),
              (this._activatedRoute = e),
              this.location.insert(t.hostView);
          }
          deactivate() {
            if (this.activated) {
              const t = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(t);
            }
          }
          activateWith(t, e) {
            if (this.isActivated)
              throw new Error("Cannot activate an already activated outlet");
            this._activatedRoute = t;
            const n = (e = e || this.resolver).resolveComponentFactory(
                t._futureSnapshot.routeConfig.component
              ),
              r = this.parentContexts.getOrCreateContext(this.name).children,
              s = new um(t, r, this.location.injector);
            (this.activated = this.location.createComponent(
              n,
              this.location.length,
              s
            )),
              this.changeDetector.markForCheck(),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(lm), Io(da), Io(Fi), No("name"), Io(to));
          }),
          (t.ɵdir = ye({
            type: t,
            selectors: [["router-outlet"]],
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
            },
            exportAs: ["outlet"],
          })),
          t
        );
      })();
      class um {
        constructor(t, e, n) {
          (this.route = t), (this.childContexts = e), (this.parent = n);
        }
        get(t, e) {
          return t === Qf
            ? this.route
            : t === lm
            ? this.childContexts
            : this.parent.get(t, e);
        }
      }
      class hm {}
      class dm {
        preload(t, e) {
          return tu(null);
        }
      }
      let pm = (() => {
          class t {
            constructor(t, e, n, r, s) {
              (this.router = t),
                (this.injector = r),
                (this.preloadingStrategy = s),
                (this.loader = new Yg(
                  e,
                  n,
                  (e) => t.triggerEvent(new Jp(e)),
                  (e) => t.triggerEvent(new Yp(e))
                ));
            }
            setUpPreloading() {
              this.subscription = this.router.events
                .pipe(
                  nu((t) => t instanceof $p),
                  eu(() => this.preload())
                )
                .subscribe(() => {});
            }
            preload() {
              const t = this.injector.get(Jt);
              return this.processRoutes(t, this.router.config);
            }
            ngOnDestroy() {
              this.subscription.unsubscribe();
            }
            processRoutes(t, e) {
              const n = [];
              for (const r of e)
                if (r.loadChildren && !r.canLoad && r._loadedConfig) {
                  const t = r._loadedConfig;
                  n.push(this.processRoutes(t.module, t.routes));
                } else
                  r.loadChildren && !r.canLoad
                    ? n.push(this.preloadConfig(t, r))
                    : r.children && n.push(this.processRoutes(t, r.children));
              return H(n).pipe(
                B(),
                D((t) => {})
              );
            }
            preloadConfig(t, e) {
              return this.preloadingStrategy.preload(e, () =>
                this.loader
                  .load(t.injector, e)
                  .pipe(
                    z(
                      (t) => (
                        (e._loadedConfig = t),
                        this.processRoutes(t.module, t.routes)
                      )
                    )
                  )
              );
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(rm), Wt(Ul), Wt(dl), Wt(yo), Wt(hm));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        fm = (() => {
          class t {
            constructor(t, e, n = {}) {
              (this.router = t),
                (this.viewportScroller = e),
                (this.options = n),
                (this.lastId = 0),
                (this.lastSource = "imperative"),
                (this.restoredId = 0),
                (this.store = {}),
                (n.scrollPositionRestoration =
                  n.scrollPositionRestoration || "disabled"),
                (n.anchorScrolling = n.anchorScrolling || "disabled");
            }
            init() {
              "disabled" !== this.options.scrollPositionRestoration &&
                this.viewportScroller.setHistoryScrollRestoration("manual"),
                (this.routerEventsSubscription = this.createScrollEvents()),
                (this.scrollEventsSubscription = this.consumeScrollEvents());
            }
            createScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof zp
                  ? ((this.store[this.lastId] =
                      this.viewportScroller.getScrollPosition()),
                    (this.lastSource = t.navigationTrigger),
                    (this.restoredId = t.restoredState
                      ? t.restoredState.navigationId
                      : 0))
                  : t instanceof $p &&
                    ((this.lastId = t.id),
                    this.scheduleScrollEvent(
                      t,
                      this.router.parseUrl(t.urlAfterRedirects).fragment
                    ));
              });
            }
            consumeScrollEvents() {
              return this.router.events.subscribe((t) => {
                t instanceof rf &&
                  (t.position
                    ? "top" === this.options.scrollPositionRestoration
                      ? this.viewportScroller.scrollToPosition([0, 0])
                      : "enabled" === this.options.scrollPositionRestoration &&
                        this.viewportScroller.scrollToPosition(t.position)
                    : t.anchor && "enabled" === this.options.anchorScrolling
                    ? this.viewportScroller.scrollToAnchor(t.anchor)
                    : "disabled" !== this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition([0, 0]));
              });
            }
            scheduleScrollEvent(t, e) {
              this.router.triggerEvent(
                new rf(
                  t,
                  "popstate" === this.lastSource
                    ? this.store[this.restoredId]
                    : null,
                  e
                )
              );
            }
            ngOnDestroy() {
              this.routerEventsSubscription &&
                this.routerEventsSubscription.unsubscribe(),
                this.scrollEventsSubscription &&
                  this.scrollEventsSubscription.unsubscribe();
            }
          }
          return (
            (t.ɵfac = function (t) {
              Vo();
            }),
            (t.ɵdir = ye({ type: t })),
            t
          );
        })();
      const gm = new Dt("ROUTER_CONFIGURATION"),
        mm = new Dt("ROUTER_FORROOT_GUARD"),
        ym = [
          cc,
          { provide: Ef, useClass: Pf },
          {
            provide: rm,
            useFactory: function (t, e, n, r, s, o, i, a = {}, l, c) {
              const u = new rm(null, t, e, n, r, s, o, yf(i));
              if (
                (l && (u.urlHandlingStrategy = l),
                c && (u.routeReuseStrategy = c),
                a.errorHandler && (u.errorHandler = a.errorHandler),
                a.malformedUriErrorHandler &&
                  (u.malformedUriErrorHandler = a.malformedUriErrorHandler),
                a.enableTracing)
              ) {
                const t = Wl();
                u.events.subscribe((e) => {
                  t.logGroup("Router Event: " + e.constructor.name),
                    t.log(e.toString()),
                    t.log(e),
                    t.logGroupEnd();
                });
              }
              return (
                a.onSameUrlNavigation &&
                  (u.onSameUrlNavigation = a.onSameUrlNavigation),
                a.paramsInheritanceStrategy &&
                  (u.paramsInheritanceStrategy = a.paramsInheritanceStrategy),
                a.urlUpdateStrategy &&
                  (u.urlUpdateStrategy = a.urlUpdateStrategy),
                a.relativeLinkResolution &&
                  (u.relativeLinkResolution = a.relativeLinkResolution),
                u
              );
            },
            deps: [
              Ef,
              lm,
              cc,
              yo,
              Ul,
              dl,
              Jg,
              gm,
              [class {}, new rt()],
              [class {}, new rt()],
            ],
          },
          lm,
          {
            provide: Qf,
            useFactory: function (t) {
              return t.routerState.root;
            },
            deps: [rm],
          },
          { provide: Ul, useClass: Hl },
          pm,
          dm,
          class {
            preload(t, e) {
              return e().pipe(Ap(() => tu(null)));
            }
          },
          { provide: gm, useValue: { enableTracing: !1 } },
        ];
      function _m() {
        return new Ml("Router", rm);
      }
      let vm = (() => {
        class t {
          constructor(t, e) {}
          static forRoot(e, n) {
            return {
              ngModule: t,
              providers: [
                ym,
                xm(e),
                {
                  provide: mm,
                  useFactory: Cm,
                  deps: [[rm, new rt(), new ot()]],
                },
                { provide: gm, useValue: n || {} },
                {
                  provide: sc,
                  useFactory: wm,
                  deps: [Ql, [new nt(ic), new rt()], gm],
                },
                { provide: fm, useFactory: bm, deps: [rm, Sc, gm] },
                {
                  provide: hm,
                  useExisting:
                    n && n.preloadingStrategy ? n.preloadingStrategy : dm,
                },
                { provide: Ml, multi: !0, useFactory: _m },
                [
                  Sm,
                  { provide: Za, multi: !0, useFactory: Om, deps: [Sm] },
                  { provide: Em, useFactory: km, deps: [Sm] },
                  { provide: el, multi: !0, useExisting: Em },
                ],
              ],
            };
          }
          static forChild(e) {
            return { ngModule: t, providers: [xm(e)] };
          }
        }
        return (
          (t.ɵmod = ge({ type: t })),
          (t.ɵinj = ut({
            factory: function (e) {
              return new (e || t)(Wt(mm, 8), Wt(rm, 8));
            },
          })),
          t
        );
      })();
      function bm(t, e, n) {
        return n.scrollOffset && e.setOffset(n.scrollOffset), new fm(t, e, n);
      }
      function wm(t, e, n = {}) {
        return n.useHash ? new lc(t, e) : new ac(t, e);
      }
      function Cm(t) {
        if (t)
          throw new Error(
            "RouterModule.forRoot() called twice. Lazy loaded modules should use RouterModule.forChild() instead."
          );
        return "guarded";
      }
      function xm(t) {
        return [
          { provide: _o, multi: !0, useValue: t },
          { provide: Jg, multi: !0, useValue: t },
        ];
      }
      let Sm = (() => {
        class t {
          constructor(t) {
            (this.injector = t),
              (this.initNavigation = !1),
              (this.resultOfPreactivationDone = new O());
          }
          appInitializer() {
            return this.injector.get(Jl, Promise.resolve(null)).then(() => {
              let t = null;
              const e = new Promise((e) => (t = e)),
                n = this.injector.get(rm),
                r = this.injector.get(gm);
              if (this.isLegacyDisabled(r) || this.isLegacyEnabled(r)) t(!0);
              else if ("disabled" === r.initialNavigation)
                n.setUpLocationChangeListener(), t(!0);
              else {
                if ("enabled" !== r.initialNavigation)
                  throw new Error(
                    `Invalid initialNavigation options: '${r.initialNavigation}'`
                  );
                (n.hooks.afterPreactivation = () =>
                  this.initNavigation
                    ? tu(null)
                    : ((this.initNavigation = !0),
                      t(!0),
                      this.resultOfPreactivationDone)),
                  n.initialNavigation();
              }
              return e;
            });
          }
          bootstrapListener(t) {
            const e = this.injector.get(gm),
              n = this.injector.get(pm),
              r = this.injector.get(fm),
              s = this.injector.get(rm),
              o = this.injector.get(jl);
            t === o.components[0] &&
              (this.isLegacyEnabled(e)
                ? s.initialNavigation()
                : this.isLegacyDisabled(e) && s.setUpLocationChangeListener(),
              n.setUpPreloading(),
              r.init(),
              s.resetRootComponentType(o.componentTypes[0]),
              this.resultOfPreactivationDone.next(null),
              this.resultOfPreactivationDone.complete());
          }
          isLegacyEnabled(t) {
            return (
              "legacy_enabled" === t.initialNavigation ||
              !0 === t.initialNavigation ||
              void 0 === t.initialNavigation
            );
          }
          isLegacyDisabled(t) {
            return (
              "legacy_disabled" === t.initialNavigation ||
              !1 === t.initialNavigation
            );
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Wt(yo));
          }),
          (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Om(t) {
        return t.appInitializer.bind(t);
      }
      function km(t) {
        return t.bootstrapListener.bind(t);
      }
      const Em = new Dt("Router Initializer");
      let Pm = (() => {
          class t {
            constructor(t) {
              this.http = t;
            }
            ngOnInit() {
              this.http
                .get("https://bakery-backend-h81u.onrender.com/api/categories")
                .pipe(
                  D((t) => {
                    const e = [];
                    for (const n in t)
                      t.hasOwnProperty(n) &&
                        e.push(
                          Object.assign(Object.assign({}, t[n]), { id: n })
                        );
                    return console.log(e), e;
                  })
                )
                .subscribe((t) => {
                  this.myCategory = t;
                }),
                this.http
                  .get("https://bakery-backend-h81u.onrender.com/api/products")
                  .pipe(
                    D((t) => {
                      const e = [];
                      for (const n in t)
                        t.hasOwnProperty(n) &&
                          e.push(
                            Object.assign(Object.assign({}, t[n]), { id: n })
                          );
                      return console.log(e), e;
                    })
                  )
                  .subscribe((t) => {
                    this.Home_products = t;
                  });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(wu));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-header"]],
              decls: 29,
              vars: 0,
              consts: [
                ["rel", "preconnect", "href", "https://fonts.gstatic.com"],
                [
                  "href",
                  "https://fonts.googleapis.com/css2?family=Satisfy&display=swap",
                  "rel",
                  "stylesheet",
                ],
                [
                  1,
                  "navbar",
                  "navbar-expand-lg",
                  "navbar-custom",
                  "navbar-light",
                  "sticky-top",
                ],
                ["routerLink", "/", 1, "navbar-brand"],
                [
                  "width",
                  "400px",
                  "height",
                  "400px",
                  "src",
                  "../../assets/bread.png",
                  "width",
                  "70",
                  "height",
                  "70",
                  "alt",
                  "",
                  1,
                  "d-inline-block",
                  "align-top",
                  2,
                  "margin-left",
                  "18px",
                ],
                [
                  2,
                  "font-family",
                  "'Satisfy', cursive",
                  "font-size",
                  "50px",
                  "margin-top",
                  "8px",
                  "color",
                  "rgba(250, 244, 229, 0.979)",
                ],
                [
                  "type",
                  "button",
                  "data-toggle",
                  "collapse",
                  "data-target",
                  "#navbarSupportedContent",
                  "aria-controls",
                  "navbarSupportedContent",
                  "aria-expanded",
                  "false",
                  "aria-label",
                  "Toggle navigation",
                  1,
                  "navbar-toggler",
                  2,
                  "color",
                  "aqua",
                ],
                [1, "navbar-toggler-icon"],
                [
                  "id",
                  "navbarSupportedContent",
                  1,
                  "collapse",
                  "navbar-collapse",
                ],
                [1, "navbar-nav", "ml-auto"],
                [1, "nav-item"],
                [1, "nav-item", "dropdown", 2, "margin-top", "8px"],
                [
                  "routerLink",
                  "/Menu/",
                  1,
                  "nav-link",
                  2,
                  "margin-top",
                  "-10px",
                  "text-align",
                  "center",
                  "border",
                  "none",
                  "border-radius",
                  "20px",
                  "font-size",
                  "17px",
                  "margin",
                  "4px 2px",
                  "width",
                  "100px",
                  "height",
                  "40px",
                  "cursor",
                  "pointer",
                  "background-color",
                  "rgb(202, 156, 96)",
                  "color",
                  "rgba(250, 244, 229, 0.979)",
                  "border",
                  "none",
                  "outline",
                  "none",
                ],
                ["role", "group", 1, "btn-group"],
                [
                  "routerLink",
                  "/login",
                  1,
                  "nav-link",
                  2,
                  "margin-top",
                  "px",
                  "text-align",
                  "center",
                ],
                [
                  "type",
                  "button",
                  1,
                  "btn",
                  "btn-sm",
                  2,
                  "font-size",
                  "17px",
                  "border",
                  "none",
                  "outline",
                  "none",
                ],
                [
                  "routerLink",
                  "/register",
                  1,
                  "nav-link",
                  2,
                  "margin-top",
                  "px",
                  "text-align",
                  "center",
                ],
                ["type", "button", 1, "btn", "btn-sm", 2, "font-size", "17px"],
                [
                  "routerLink",
                  "/search",
                  1,
                  "nav-link",
                  2,
                  "text-align",
                  "center",
                ],
                [
                  "routerLink",
                  "/cart",
                  1,
                  "nav-link",
                  2,
                  "margin-top",
                  "3px",
                  "margin-left",
                  "20px",
                  "margin-right",
                  "40px",
                  "text-align",
                  "center",
                ],
                [
                  "width",
                  "400px",
                  "height",
                  "400px",
                  "src",
                  "../../assets/shopping-cart.png",
                  "width",
                  "40",
                  "height",
                  "40",
                  "alt",
                  "Cart_image",
                ],
              ],
              template: function (t, e) {
                1 & t &&
                  (Lo(0, "link", 0),
                  Lo(1, "link", 1),
                  Uo(2, "nav", 2),
                  Uo(3, "a", 3),
                  Lo(4, "img", 4),
                  Fo(),
                  Uo(5, "a", 3),
                  Uo(6, "h4", 5),
                  gi(7, "Bakers.co"),
                  Fo(),
                  Fo(),
                  Uo(8, "button", 6),
                  Lo(9, "span", 7),
                  Fo(),
                  Uo(10, "div", 8),
                  Uo(11, "ul", 9),
                  Lo(12, "li", 10),
                  Uo(13, "li", 11),
                  Uo(14, "button", 12),
                  gi(15, " Menu "),
                  Fo(),
                  Fo(),
                  Uo(16, "div", 13),
                  Uo(17, "a", 14),
                  Uo(18, "button", 15),
                  gi(19, " Login "),
                  Fo(),
                  Fo(),
                  Uo(20, "a", 16),
                  Uo(21, "button", 17),
                  gi(22, " Register "),
                  Fo(),
                  Fo(),
                  Uo(23, "a", 18),
                  Uo(24, "button", 17),
                  gi(25, " Search "),
                  Fo(),
                  Fo(),
                  Fo(),
                  Uo(26, "li", 10),
                  Uo(27, "a", 19),
                  Lo(28, "img", 20),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo());
              },
              directives: [zd, om, sm],
              styles: [
                ".nav-link[_ngcontent-%COMP%], .navbar-custom[_ngcontent-%COMP%]   .navbar-brand[_ngcontent-%COMP%], .navbar-custom[_ngcontent-%COMP%]   .navbar-text[_ngcontent-%COMP%]{color:#f1f4f8}.navbar-nav[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > .dropdown-menu[_ngcontent-%COMP%]{background-color:#f5f5f5;text-align:center}.navbar-nav[_ngcontent-%COMP%] > li[_ngcontent-%COMP%] > .dropdown-menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{background-color:rgba(247,232,195,.979)}.btn[_ngcontent-%COMP%]{background-color:#ca9c60;width:100px;height:40px;border:none;color:#f5f5f5;text-align:center;display:inline-block;margin:4px 2px;border-radius:20px;outline:none}.container[_ngcontent-%COMP%]{width:900px;height:400px;border-radius:10mm}*[_ngcontent-%COMP%]{box-sizing:border-box}#myInput[_ngcontent-%COMP%]{background-image:url(/css/searchicon.png);background-position:10px 12px;background-repeat:no-repeat;width:100%;font-size:16px;padding:12px 20px 12px 40px;border:1px solid #ddd;margin-bottom:12px}#myUL[_ngcontent-%COMP%]{list-style-type:none;padding:0;margin:0}#myUL[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{border:1px solid #ddd;margin-top:-1px;background-color:#f6f6f6;padding:12px;text-decoration:none;font-size:18px;color:#000;display:block}#myUL[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:not(.header){background-color:#eee}",
              ],
            })),
            t
          );
        })(),
        Tm = (() => {
          class t {
            constructor() {
              this.title = "Bakery";
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-root"]],
              decls: 2,
              vars: 0,
              template: function (t, e) {
                1 & t && (Lo(0, "app-header"), Lo(1, "router-outlet"));
              },
              directives: [Pm, cm],
              styles: [""],
            })),
            t
          );
        })();
      class Am {
        constructor(t, e, n) {
          (this.Email = t), (this.Fullname = n), (this._id = e);
        }
      }
      let Mm = (() => {
        class t {
          constructor(t, e, n) {
            (this.route = t),
              (this.router = e),
              (this.http = n),
              (this.user = new ed(null));
          }
          ngOnInit() {}
          loginClicked(t) {
            const e = t.value.Password,
              n = { Email: t.value.Email, Password: e };
            alert(e),
              this.http
                .post("https://bakery-backend-h81u.onrender.com/api/signin", n)
                .subscribe((t) => {
                  console.log(t),
                    alert("Log in Successfull Baker!"),
                    this.router.navigate(["/main"]);
                }),
              t.reset();
          }
          handleAuthentication(t, e, n) {
            const r = new Am(t, e, n);
            this.user.next(r),
              localStorage.setItem("userData", JSON.stringify(r)),
              localStorage.setItem("user_email", t),
              localStorage.setItem("user_name", n),
              localStorage.setItem("user_id", e),
              sessionStorage.setItem("user_name", name);
          }
        }
        return (
          (t.ɵfac = function (e) {
            return new (e || t)(Io(Qf), Io(rm), Io(wu));
          }),
          (t.ɵcmp = he({
            type: t,
            selectors: [["app-login"]],
            decls: 20,
            vars: 0,
            consts: [
              [
                "rel",
                "stylesheet",
                "href",
                "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
              ],
              [2, "overflow-x", "hidden"],
              [1, "row"],
              [1, "col-lg-4"],
              [1, "col-lg-4", "bg-img"],
              [
                1,
                "container",
                2,
                "border-radius",
                "5px",
                "color",
                "#faf4e5",
                3,
                "submit",
              ],
              ["myform", "ngForm"],
              ["for", "email"],
              [
                "ngModel",
                "",
                "type",
                "text",
                "placeholder",
                "Enter Email",
                "name",
                "Email",
                "required",
                "",
              ],
              ["for", "psw"],
              [
                "ngModel",
                "",
                "type",
                "password",
                "placeholder",
                "Enter Password",
                "name",
                "Password",
                "required",
                "",
              ],
              ["type", "submit", 1, "btn", "button"],
            ],
            template: function (t, e) {
              if (1 & t) {
                const t = Ho();
                Lo(0, "link", 0),
                  Uo(1, "div", 1),
                  Uo(2, "div", 2),
                  Lo(3, "div", 3),
                  Uo(4, "div", 4),
                  Uo(5, "form", 5, 6),
                  qo("submit", function () {
                    Ge(t);
                    const n = Ro(6);
                    return e.loginClicked(n);
                  }),
                  Uo(7, "h1"),
                  gi(8, "Login"),
                  Fo(),
                  Uo(9, "label", 7),
                  Uo(10, "b"),
                  gi(11, "Email"),
                  Fo(),
                  Fo(),
                  Lo(12, "input", 8),
                  Uo(13, "label", 9),
                  Uo(14, "b"),
                  gi(15, "Password"),
                  Fo(),
                  Fo(),
                  Lo(16, "input", 10),
                  Uo(17, "button", 11),
                  gi(18, "Login"),
                  Fo(),
                  Fo(),
                  Fo(),
                  Lo(19, "div", 3),
                  Fo(),
                  Fo();
              }
            },
            directives: [Kh, Ju, Hh, $u, Ku, Qh, Yh],
            styles: [
              'body[_ngcontent-%COMP%], html[_ngcontent-%COMP%]{height:100%}*[_ngcontent-%COMP%]{box-sizing:border-box}.bg-img[_ngcontent-%COMP%]{min-height:380px;background-position:50%;background-repeat:no-repeat;background-size:cover;position:relative}.container[_ngcontent-%COMP%]{position:relative;max-width:350px;padding:16px;background-color:hsla(0,0%,45.9%,.671)}input[type=password][_ngcontent-%COMP%], input[type=text][_ngcontent-%COMP%]{width:100%;padding:15px;margin:5px 0 22px;border:none;background:#f1f1f1}input[type=password][_ngcontent-%COMP%]:focus, input[type=text][_ngcontent-%COMP%]:focus{background-color:#ddd;outline:none}.btn[_ngcontent-%COMP%]{background-color:rgba(171,173,175,.79);position:relative;color:#fff;padding:16px 20px;border:none;cursor:pointer;width:100%;transition-duration:.4s;text-decoration:none;overflow:hidden;opacity:.9}.btn[_ngcontent-%COMP%]:hover{opacity:1}.pic[_ngcontent-%COMP%]{margin-left:25%}.pic[_ngcontent-%COMP%], .pic2[_ngcontent-%COMP%]{margin-top:30px}.pic2[_ngcontent-%COMP%]{margin-left:60px;transform:rotate(45deg)}.button[_ngcontent-%COMP%]{position:relative;background-color:#c9c9c9;border:none;font-size:28px;color:#fff;padding:16px 20px;width:100%;text-align:center;transition-duration:.4s;text-decoration:none;overflow:hidden;cursor:pointer}.button[_ngcontent-%COMP%]:after{content:"";background:#3fe0e6;display:block;position:absolute;padding-top:300%;padding-left:350%;margin-left:-20px!important;margin-top:-120%;opacity:0;transition:all .8s}.button[_ngcontent-%COMP%]:active:after{padding:0;margin:0;opacity:1;transition:0s}',
            ],
          })),
          t
        );
      })();
      class Rm {
        constructor(t, e, n, r, s, o) {
          (this.product_id = t),
            (this.product_name = e),
            (this.product_count = n),
            (this.product_price = s),
            (this.product_image = r),
            (this.product_total = o);
        }
      }
      class Im {
        constructor() {
          (this.CartChanged = new Aa()), (this.cart = []);
        }
        getcart() {
          return this.cart.slice();
        }
        addCart(t) {
          this.cart.push(t), this.CartChanged.emit(this.cart.slice());
        }
        deleteCart(t) {
          this.cart.splice(t, 1);
        }
      }
      const Nm = ["ingre_qty"];
      let Vm = (() => {
          class t {
            constructor(t, e, n, r) {
              (this.route = t),
                (this.router = e),
                (this.http = n),
                (this.cartServi = r);
            }
            ngOnInit() {
              let t = this.route.snapshot.paramMap.get("id");
              this.http
                .get(
                  "https://bakery-backend-h81u.onrender.com/api/product/" + t
                )
                .subscribe((t) => {
                  console.log("array" + t), (this.Home_products = t);
                });
            }
            addTocart() {
              console.log(this.Home_products._id);
              const t = this.ingre_qty.nativeElement.value;
              let e = this.Home_products.ProductName,
                n = t,
                r = this.Home_products.photoByPath,
                s = this.Home_products.Cost,
                o = t * s;
              console.log(this.Home_products.name), console.log(t);
              const i = new Rm(this.Home_products._id, e, n, r, s, o);
              console.log(i),
                this.cartServi.addCart(i),
                this.router.navigateByUrl("/cart");
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Qf), Io(rm), Io(wu), Io(Im));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-product-details"]],
              viewQuery: function (t, e) {
                var n, r;
                1 & t && ((r = Nm), !0, za(Be(), qe(), r, !0, void 0, !1)),
                  2 & t && Ha((n = $a())) && (e.ingre_qty = n.first);
              },
              decls: 46,
              vars: 5,
              consts: [
                ["rel", "preconnect", "href", "https://fonts.gstatic.com"],
                [
                  "href",
                  "https://fonts.googleapis.com/css2?family=Amatic+SC&family=Dancing+Script:wght@600&display=swap",
                  "rel",
                  "stylesheet",
                ],
                [2, "overflow-x", "hidden", "background", "#c9c9c999"],
                [1, "row"],
                [1, "col-lg-5", "text-center"],
                ["width", "512px", "height", "620px", "alt", "", 3, "src"],
                [1, "col-lg-7", "bg-gray", "Details", 2, "margin-top", "5%"],
                [2, "font-size", "50px"],
                [1, "bu"],
                [2, "font-size", "35px"],
                [2, "font-size", "30px"],
                [2, "font-size", "38px"],
                [2, "font-family", "-apple-system", "font-size", "18px"],
                ["name", "", "id", ""],
                ["ingre_qty", ""],
                ["value", "1"],
                ["value", "2"],
                ["value", "3"],
                ["value", "4"],
                ["value", "5"],
                [1, "btn", "text-light", 3, "click"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Lo(0, "link", 0),
                  Lo(1, "link", 1),
                  Uo(2, "div", 2),
                  Uo(3, "div", 3),
                  Uo(4, "div", 4),
                  Lo(5, "img", 5),
                  Fo(),
                  Uo(6, "div", 6),
                  Uo(7, "h1", 7),
                  Uo(8, "b", 8),
                  gi(9, "Name"),
                  Fo(),
                  gi(10),
                  Fo(),
                  Lo(11, "hr"),
                  Uo(12, "h2", 9),
                  Uo(13, "b", 8),
                  gi(14, "Category"),
                  Fo(),
                  gi(15),
                  Fo(),
                  Lo(16, "hr"),
                  Uo(17, "h4", 9),
                  Uo(18, "b", 8),
                  gi(19, "Price"),
                  Fo(),
                  gi(20),
                  Fo(),
                  Lo(21, "hr"),
                  Uo(22, "h3", 10),
                  Uo(23, "b", 8),
                  gi(24, "Description"),
                  Fo(),
                  gi(25),
                  Fo(),
                  Lo(26, "hr"),
                  Uo(27, "h4", 11),
                  Uo(28, "b", 8),
                  gi(29, " Select Qty:"),
                  Fo(),
                  Fo(),
                  Uo(30, "span", 12),
                  Uo(31, "select", 13, 14),
                  Uo(33, "option", 15),
                  gi(34, "1"),
                  Fo(),
                  Uo(35, "option", 16),
                  gi(36, "2"),
                  Fo(),
                  Uo(37, "option", 17),
                  gi(38, "3"),
                  Fo(),
                  Uo(39, "option", 18),
                  gi(40, "4"),
                  Fo(),
                  Uo(41, "option", 19),
                  gi(42, "5"),
                  Fo(),
                  Fo(),
                  Fo(),
                  Lo(43, "hr"),
                  Uo(44, "button", 20),
                  qo("click", function () {
                    return e.addTocart();
                  }),
                  gi(45, " Add to Cart "),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo()),
                  2 & t &&
                    (Ar(5),
                    Zo(
                      "src",
                      "https://bakery-backend-h81u.onrender.com/",
                      e.Home_products.photoByPath,
                      "",
                      hr
                    ),
                    Ar(5),
                    yi(" : ", e.Home_products.ProductName, " "),
                    Ar(5),
                    yi(" : ", e.Home_products.category.name, " "),
                    Ar(5),
                    yi(" : Rs. ", e.Home_products.Cost, " "),
                    Ar(5),
                    yi(" : ", e.Home_products.Description, " "));
              },
              directives: [bh, Sh],
              styles: [
                '.Details[_ngcontent-%COMP%]{color:#faf4e5;font-size:28px;font-family:Amatic SC,cursive}.b[_ngcontent-%COMP%]{font-size:38px}.bu[_ngcontent-%COMP%]{color:#606060}.button[_ngcontent-%COMP%]:after{content:"";background:#3fe0e6;display:block;position:absolute;padding-top:300%;padding-left:350%;margin-left:-20px!important;margin-top:-120%;opacity:0;transition:all .8s}.button[_ngcontent-%COMP%]:active:after{padding:0;margin:0;opacity:1;transition:0s}.containerr[_ngcontent-%COMP%]{position:relative;max-width:350px;padding:16px;background-color:hsla(0,0%,59.2%,.397)}.btn[_ngcontent-%COMP%]{background-color:#ca9c60;width:200px;height:60px;font-size:30px}',
              ],
            })),
            t
          );
        })(),
        jm = (() => {
          class t {
            constructor(t) {
              this.http = t;
            }
            ngOnInit() {}
            onCreatePost(t) {
              console.log(t),
                this.http
                  .post(
                    "https://bakery-backend-h81u.onrender.com/api/signup",
                    t
                  )
                  .subscribe((t) => {
                    console.log(t),
                      alert("Welcome!! Baker, Account created Successfully.");
                  });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(wu));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-register"]],
              decls: 69,
              vars: 0,
              consts: [
                [
                  "rel",
                  "stylesheet",
                  "href",
                  "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
                ],
                [2, "overflow-x", "hidden"],
                [1, "row"],
                [1, "col-lg-4"],
                [
                  1,
                  "container",
                  "card",
                  2,
                  "background-color",
                  "rgba(117, 117, 117, 0.671)",
                ],
                [1, "card-body", "mx-auto", 2, "max-width", "400px"],
                [1, "card-title", "mt-3", "text-center", 2, "color", "white"],
                [1, "text-center", 2, "color", "white"],
                [
                  "href",
                  "/users/google-oauth/",
                  1,
                  "oauth-container",
                  "btn",
                  "darken-4",
                  "white",
                  "black-text",
                  2,
                  "width",
                  "100%",
                  "background-color",
                  "#ffffff",
                  "text-transform",
                  "none",
                ],
                [
                  "width",
                  "20px",
                  "alt",
                  "Google sign-in",
                  "src",
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
                  2,
                  "margin-top",
                  "7px",
                  "margin-right",
                  "8px",
                ],
                ["href", "", 1, "btn", "btn-block", "btn-facebook"],
                [1, "fab", "fa-facebook-f"],
                [1, "divider-text"],
                [1, "bg-light", 2, "border-radius", "40px"],
                [3, "ngSubmit"],
                ["postForm", "ngForm"],
                [1, "form-group", "input-group"],
                [1, "input-group-prepend"],
                [1, "input-group-text"],
                [1, "fa", "fa-user"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Fullname",
                  "placeholder",
                  "Full name",
                  "type",
                  "text",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-envelope"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Email",
                  "placeholder",
                  "Email address",
                  "type",
                  "email",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-birthday-cake"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Dateofbirth",
                  "placeholder",
                  "Date Of Birth",
                  "type",
                  "date",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-phone"],
                [1, "custom-select", 2, "max-width", "120px"],
                ["selected", ""],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Mobile",
                  "placeholder",
                  "Phone number",
                  "type",
                  "text",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-lock"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Password",
                  "placeholder",
                  "Create password",
                  "type",
                  "password",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-address-card"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "Address",
                  "placeholder",
                  "Address",
                  "type",
                  "text",
                  1,
                  "form-control",
                ],
                [1, "fa", "fa-building"],
                [
                  "required",
                  "",
                  "ngModel",
                  "",
                  "name",
                  "City",
                  "placeholder",
                  "City",
                  "type",
                  "text",
                  1,
                  "form-control",
                ],
                [1, "form-group"],
                ["type", "submit", 1, "btn", "button", "btn-block"],
                ["routerLink", "/login", 2, "color", "rgb(183, 238, 238)"],
              ],
              template: function (t, e) {
                if (1 & t) {
                  const t = Ho();
                  Lo(0, "link", 0),
                    Uo(1, "div", 1),
                    Uo(2, "div", 2),
                    Lo(3, "div", 3),
                    Uo(4, "div", 3),
                    Uo(5, "div", 4),
                    Uo(6, "article", 5),
                    Uo(7, "h2", 6),
                    gi(8, "Create Account"),
                    Fo(),
                    Uo(9, "p", 7),
                    gi(10, "Get started with your free account"),
                    Fo(),
                    Uo(11, "p"),
                    Uo(12, "a", 8),
                    Lo(13, "img", 9),
                    gi(14, " Login with Google "),
                    Fo(),
                    Uo(15, "a", 10),
                    Lo(16, "i", 11),
                    gi(17, " \xa0 Login via facebook"),
                    Fo(),
                    Fo(),
                    Uo(18, "p", 12),
                    Uo(19, "span", 13),
                    gi(20, "OR"),
                    Fo(),
                    Fo(),
                    Uo(21, "form", 14, 15),
                    qo("ngSubmit", function () {
                      Ge(t);
                      const n = Ro(22);
                      return e.onCreatePost(n.value);
                    }),
                    Uo(23, "div", 16),
                    Uo(24, "div", 17),
                    Uo(25, "span", 18),
                    Lo(26, "i", 19),
                    Fo(),
                    Fo(),
                    Lo(27, "input", 20),
                    Fo(),
                    Uo(28, "div", 16),
                    Uo(29, "div", 17),
                    Uo(30, "span", 18),
                    Lo(31, "i", 21),
                    Fo(),
                    Fo(),
                    Lo(32, "input", 22),
                    Fo(),
                    Uo(33, "div", 16),
                    Uo(34, "div", 17),
                    Uo(35, "span", 18),
                    Lo(36, "i", 23),
                    Fo(),
                    Fo(),
                    Lo(37, "input", 24),
                    Fo(),
                    Uo(38, "div", 16),
                    Uo(39, "div", 17),
                    Uo(40, "span", 18),
                    Lo(41, "i", 25),
                    Fo(),
                    Fo(),
                    Uo(42, "select", 26),
                    Uo(43, "option", 27),
                    gi(44, "+91"),
                    Fo(),
                    Fo(),
                    Lo(45, "input", 28),
                    Fo(),
                    Uo(46, "div", 16),
                    Uo(47, "div", 17),
                    Uo(48, "span", 18),
                    Lo(49, "i", 29),
                    Fo(),
                    Fo(),
                    Lo(50, "input", 30),
                    Fo(),
                    Uo(51, "div", 16),
                    Uo(52, "div", 17),
                    Uo(53, "span", 18),
                    Lo(54, "i", 31),
                    Fo(),
                    Fo(),
                    Lo(55, "input", 32),
                    Fo(),
                    Uo(56, "div", 16),
                    Uo(57, "div", 17),
                    Uo(58, "span", 18),
                    Lo(59, "i", 33),
                    Fo(),
                    Fo(),
                    Lo(60, "input", 34),
                    Fo(),
                    Uo(61, "div", 35),
                    Uo(62, "button", 36),
                    gi(63, " Register "),
                    Fo(),
                    Fo(),
                    Uo(64, "p", 7),
                    gi(65, "Have an account? "),
                    Uo(66, "a", 37),
                    gi(67, "Log In"),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Lo(68, "div", 3),
                    Fo(),
                    Fo();
                }
              },
              directives: [Kh, Ju, Hh, $u, Yh, Ku, Qh, bh, Sh, om],
              styles: [
                '.divider-text[_ngcontent-%COMP%]{position:relative;text-align:center;margin-top:15px;margin-bottom:15px}.divider-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:7px;font-size:12px;position:relative;z-index:2}.divider-text[_ngcontent-%COMP%]:after{content:"";position:absolute;width:100%;border-bottom:1px solid #fffbfb;top:55%;left:0;z-index:1}.btn-facebook[_ngcontent-%COMP%]{background-color:#405d9d;color:#fff}.btn-twitter[_ngcontent-%COMP%]{background-color:#42aeec;color:#fff}.button[_ngcontent-%COMP%]{position:relative;background-color:rgba(171,173,175,.79);border:none;font-size:28px;color:#fff;padding:16px 20px;width:100%;text-align:center;transition-duration:.4s;text-decoration:none;overflow:hidden;cursor:pointer}.button[_ngcontent-%COMP%]:after{content:"";background:#fffefe;display:block;position:absolute;padding-top:300%;padding-left:350%;margin-left:-20px!important;margin-top:-120%;opacity:0;transition:all .8s}.button[_ngcontent-%COMP%]:active:after{padding:0;margin:0;opacity:1;transition:0s}',
              ],
            })),
            t
          );
        })();
      class Dm {
        constructor(t, e, n, r) {
          (this.product = t),
            (this.name = e),
            (this.count = n),
            (this.price = r);
        }
      }
      class Um {
        constructor() {
          (this.OrderChanged = new Aa()), (this.order = []);
        }
        getOrder() {
          return this.order.slice();
        }
        addToOrder(t) {
          this.order.push(t), this.OrderChanged.emit(this.order.slice());
        }
      }
      function Fm(t, e) {
        if (1 & t) {
          const t = Ho();
          Uo(0, "tr"),
            Uo(1, "td"),
            gi(2),
            Fo(),
            Uo(3, "td"),
            gi(4),
            Fo(),
            Uo(5, "td"),
            Lo(6, "img", 12),
            Fo(),
            Uo(7, "td"),
            gi(8),
            Fo(),
            Uo(9, "td"),
            gi(10),
            Fo(),
            Uo(11, "td"),
            gi(12),
            Fo(),
            Uo(13, "td"),
            Uo(14, "button", 13),
            qo("click", function () {
              Ge(t);
              const n = e.index;
              return Wo().deleteCart(n);
            }),
            gi(15, " X "),
            Fo(),
            Fo(),
            Fo();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = e.index;
          Ar(2),
            mi(n + 1),
            Ar(2),
            mi(t.product_name),
            Ar(2),
            Zo(
              "src",
              "https://bakery-backend-h81u.onrender.com/",
              t.product_image,
              "",
              hr
            ),
            Ar(2),
            mi(t.product_count),
            Ar(2),
            mi(t.product_price),
            Ar(2),
            mi(t.product_count * t.product_price);
        }
      }
      function Lm(t, e) {
        1 & t &&
          (Uo(0, "tr", 14),
          Uo(1, "th", 15),
          gi(2, " No Items In Cart. "),
          Fo(),
          Fo());
      }
      let Hm = (() => {
          class t {
            constructor(t, e, n) {
              (this.cartSer = t),
                (this.http = e),
                (this.newOrde = n),
                (this.final_total = 0);
            }
            ngOnInit() {
              this.cart = this.cartSer.getcart();
              for (let t of this.cart)
                this.final_total = this.final_total + t.product_total;
            }
            deleteCart(t) {
              this.cartSer.deleteCart(t),
                (this.cart = this.cartSer.getcart()),
                (this.final_total = 0);
              for (let e of this.cart)
                this.final_total = this.final_total + e.product_total;
            }
            placeOrder2() {
              for (let e of this.cart) {
                const t = new Dm(
                  e.product_id,
                  e.product_name,
                  e.product_count,
                  e.product_price
                );
                this.newOrde.addToOrder(t);
              }
              let t;
              (t = this.newOrde.getOrder()),
                this.http
                  .post(
                    "https://bakery-backend-h81u.onrender.com/api/order/create",
                    {
                      products: t,
                      amount: this.final_total,
                      address: "Pune",
                      user: "5ef1ca02243b8d1fdcfa99e7",
                    }
                  )
                  .subscribe((t) => {
                    console.log(t), alert("Order is created !!!!");
                  });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Io(Im), Io(wu), Io(Um));
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-cart"]],
              decls: 39,
              vars: 3,
              consts: [
                [2, "overflow-x", "hidden"],
                [1, "row"],
                [1, "col-lg-2"],
                [1, "col-lg-8"],
                [
                  1,
                  "col-lg-12",
                  "containerr",
                  2,
                  "color",
                  "rgba(255, 255, 255, 0.767)",
                  "border-radius",
                  "20px",
                ],
                [1, "text-center"],
                [
                  1,
                  "table",
                  "table-hover",
                  "table-bordered",
                  2,
                  "margin",
                  "0 auto",
                  "text-align",
                  "center",
                  "border",
                  "black",
                  "color",
                  "rgba(255, 255, 255, 0.767)",
                  "border-radius",
                  "20px",
                ],
                [4, "ngFor", "ngForOf"],
                ["style", "border: black;", 4, "ngIf"],
                ["colspan", "5", 1, "text-right"],
                [1, "col-lg-12"],
                [1, "btn", "container", "float-right", "mr-8", 3, "click"],
                [
                  "width",
                  "100px",
                  "height",
                  "100px",
                  "alt",
                  "",
                  2,
                  "border-radius",
                  "20px",
                  "justify-content",
                  "center",
                  3,
                  "src",
                ],
                [
                  1,
                  "btn",
                  "text-light",
                  "rounded",
                  2,
                  "border-radius",
                  "20px",
                  "background-color",
                  "rgb(245, 70, 17)",
                  3,
                  "click",
                ],
                [2, "border", "black"],
                ["colspan", "7", 1, "text-center", 2, "border", "1px black"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Uo(0, "div", 0),
                  Uo(1, "div", 1),
                  Lo(2, "div", 2),
                  Uo(3, "div", 3),
                  Uo(4, "div", 1),
                  Uo(5, "div", 4),
                  Uo(6, "h1", 5),
                  gi(7, " Your Cart "),
                  Fo(),
                  Uo(8, "table", 6),
                  Uo(9, "thead"),
                  Uo(10, "tr"),
                  Uo(11, "th"),
                  gi(12, "Sr No"),
                  Fo(),
                  Uo(13, "th"),
                  gi(14, "Product Name"),
                  Fo(),
                  Uo(15, "th"),
                  gi(16, "Product Image"),
                  Fo(),
                  Uo(17, "th"),
                  gi(18, "Product Qty"),
                  Fo(),
                  Uo(19, "th"),
                  gi(20, "Product Price"),
                  Fo(),
                  Uo(21, "th"),
                  gi(22, "Total"),
                  Fo(),
                  Uo(23, "th"),
                  gi(24, "Remove"),
                  Fo(),
                  Fo(),
                  Fo(),
                  Uo(25, "tbody"),
                  Mo(26, Fm, 16, 6, "tr", 7),
                  Mo(27, Lm, 3, 0, "tr", 8),
                  Fo(),
                  Uo(28, "tfoot"),
                  Uo(29, "tr"),
                  Uo(30, "th", 9),
                  gi(31, " Final Amount "),
                  Fo(),
                  Uo(32, "th"),
                  gi(33),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo(),
                  Uo(34, "div", 1),
                  Uo(35, "div", 10),
                  Uo(36, "button", 11),
                  qo("click", function () {
                    return e.placeOrder2();
                  }),
                  gi(37, " Check Out "),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo(),
                  Fo(),
                  Lo(38, "div", 2),
                  Fo(),
                  Fo()),
                  2 & t &&
                    (Ar(26),
                    jo("ngForOf", e.cart),
                    Ar(1),
                    jo("ngIf", 0 === e.cart.length),
                    Ar(6),
                    yi(" \u20b9 ", e.final_total, " "));
              },
              directives: [yc, vc],
              styles: [
                ".containerr[_ngcontent-%COMP%]{max-width:auto;background-color:rgba(74,75,75,.76)}.container[_ngcontent-%COMP%], .containerr[_ngcontent-%COMP%]{position:relative;right:0;padding:16px}.container[_ngcontent-%COMP%]{background-color:#dfc75d;max-width:-webkit-fit-content;max-width:-moz-fit-content;max-width:fit-content;font-size:20px;color:#fdfbf1}table.table-bordered[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > td[_ngcontent-%COMP%], table.table-bordered[_ngcontent-%COMP%] > tfoot[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%], table.table-bordered[_ngcontent-%COMP%] > thead[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%], table.table-bordered[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{border:1px solid hsla(0,0%,66.7%,.726)}",
              ],
            })),
            t
          );
        })(),
        zm = (() => {
          class t {
            constructor(t) {
              (this.http = t), (this.Home_products = []);
            }
            getProduct() {
              return this.Home_products.slice();
            }
            fetchData() {
              this.http
                .get("https://bakery-backend-h81u.onrender.com/api/products")
                .pipe(
                  D((t) => {
                    const e = [];
                    for (const n in t)
                      t.hasOwnProperty(n) &&
                        e.push(
                          Object.assign(Object.assign({}, t[n]), { id: n })
                        );
                    return e;
                  })
                )
                .subscribe((t) => {
                  console.log("array" + t), (this.Home_products = t);
                });
            }
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)(Wt(wu));
            }),
            (t.ɵprov = ct({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        $m = (() => {
          class t {
            constructor() {}
            ngOnInit() {}
          }
          return (
            (t.ɵfac = function (e) {
              return new (e || t)();
            }),
            (t.ɵcmp = he({
              type: t,
              selectors: [["app-footer"]],
              decls: 32,
              vars: 0,
              consts: [
                ["rel", "preconnect", "href", "https://fonts.gstatic.com"],
                [
                  "href",
                  "https://fonts.googleapis.com/css2?family=Raleway:wght@300&display=swap",
                  "rel",
                  "stylesheet",
                ],
                [1, "panel-footer"],
                [1, "container"],
                [1, "row"],
                ["id", "hours", 1, "col-sm-4"],
                [1, "visible-xs"],
                ["id", "address", 1, "col-sm-4"],
                ["id", "testimonials", 1, "col-sm-4"],
                [1, "text-center"],
              ],
              template: function (t, e) {
                1 & t &&
                  (Lo(0, "link", 0),
                  Lo(1, "link", 1),
                  Uo(2, "footer", 2),
                  Uo(3, "div", 3),
                  Uo(4, "div", 4),
                  Uo(5, "section", 5),
                  Uo(6, "span"),
                  gi(7, "Hours:"),
                  Fo(),
                  Lo(8, "br"),
                  gi(9, " Sun-Thurs: 11:15am - 10:00pm"),
                  Lo(10, "br"),
                  gi(11, " Fri: 11:15am - 2:30pm"),
                  Lo(12, "br"),
                  gi(13, " Saturday Closed "),
                  Lo(14, "hr", 6),
                  Fo(),
                  Uo(15, "section", 7),
                  Uo(16, "span"),
                  gi(17, "Address:"),
                  Fo(),
                  Lo(18, "br"),
                  gi(19, " The Baker Street"),
                  Lo(20, "br"),
                  gi(21, " Bakers Area, 571099 "),
                  Uo(22, "p"),
                  gi(
                    23,
                    "* Delivery area within 3-4 KiloMeters, with minimum order of Rs.500 plus Rs.50 charge for all deliveries."
                  ),
                  Fo(),
                  Lo(24, "hr", 6),
                  Fo(),
                  Uo(25, "section", 8),
                  Uo(26, "p"),
                  gi(
                    27,
                    "\"The best Bakeria I've been to! And that's saying a lot, since I've been to many!\""
                  ),
                  Fo(),
                  Uo(28, "p"),
                  gi(
                    29,
                    "\"Amazing desserts! Great service! Couldn't ask for more! I'll be back again and again!\""
                  ),
                  Fo(),
                  Fo(),
                  Fo(),
                  Uo(30, "div", 9),
                  gi(31, "\xa9 Copyright HRKU's Bakers.Co 2020"),
                  Fo(),
                  Fo(),
                  Fo());
              },
              styles: [
                ".panel-footer[_ngcontent-%COMP%]{margin-top:30px;padding-top:35px;padding-bottom:30px;background-color:hsla(0,0%,96.1%,.27);border-top:0}.panel-footer[_ngcontent-%COMP%]   div.row[_ngcontent-%COMP%]{margin-bottom:35px}#address[_ngcontent-%COMP%], #hours[_ngcontent-%COMP%]{line-height:2}#address[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], #hours[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:1.3em}#address[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000;font-family:Raleway,sans-serif;font-size:.8em;line-height:1.8}#testimonials[_ngcontent-%COMP%]{font-style:italic}#testimonials[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-child(2){margin-top:25px}.container[_ngcontent-%COMP%]{color:#000;font-size:20px;font-family:Raleway,sans-serif}",
                ".panel-footer[_ngcontent-%COMP%]{margin-top:30px;padding-top:35px;padding-bottom:30px;background-color:hsla(0,0%,96.1%,.27);border-top:0}.panel-footer[_ngcontent-%COMP%]   div.row[_ngcontent-%COMP%]{margin-bottom:35px}#address[_ngcontent-%COMP%], #hours[_ngcontent-%COMP%]{line-height:2}#address[_ngcontent-%COMP%] > span[_ngcontent-%COMP%], #hours[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{font-size:1.3em}#address[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000;font-family:Raleway,sans-serif;font-size:.8em;line-height:1.8}#testimonials[_ngcontent-%COMP%]{font-style:italic}#testimonials[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]:nth-child(2){margin-top:25px}.container[_ngcontent-%COMP%]{color:#000;font-size:20px;font-family:Raleway,sans-serif}",
              ],
            })),
            t
          );
        })();
      function qm(t, e) {
        if (
          (1 & t &&
            (Uo(0, "span", 16),
            Uo(1, "span", 17),
            gi(2, "\u2665"),
            Fo(),
            gi(3, "\u2665 "),
            Fo()),
          2 & t)
        ) {
          const t = e.fill;
          ri("full", 100 === t), Ar(1), ni("width", t, "%");
        }
      }
      function Bm(t, e) {
        if (1 & t) {
          const t = Ho();
          Uo(0, "div", 7),
            Uo(1, "a", 8),
            Uo(2, "div", 9),
            Lo(3, "img", 10),
            Uo(4, "div", 11),
            Uo(5, "h3", 12),
            gi(6),
            Fo(),
            Lo(7, "br"),
            Uo(8, "p", 13),
            gi(9),
            Fo(),
            Lo(10, "br"),
            Uo(11, "p", 12),
            Mo(12, qm, 4, 4, "ng-template", null, 14, Wa),
            Uo(14, "ngb-rating", 15),
            qo("rateChange", function (n) {
              return Ge(t), (e.$implicit.rating = n);
            }),
            Fo(),
            Fo(),
            Fo(),
            Fo(),
            Fo(),
            Fo();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = Ro(13);
          Ar(1),
            Zo("routerLink", "/product-details/", t._id, ""),
            Ar(2),
            Zo(
              "src",
              "https://bakery-backend-h81u.onrender.com/",
              t.photoByPath,
              "",
              hr
            ),
            Ar(3),
            mi(t.ProductName),
            Ar(3),
            yi("Rs.", t.Cost, ""),
            Ar(5),
            jo("rate", t.rating)("starTemplate", n)("readonly", !0)("max", 5);
        }
      }
      function Gm(t, e) {
        if (
          (1 & t && (Uo(0, "li", 8), Uo(1, "a", 9), gi(2), Fo(), Fo()), 2 & t)
        ) {
          const t = e.$implicit;
          Ar(1),
            Zo("routerLink", "/product-details/", t._id, ""),
            Ar(1),
            yi(" ", t.ProductName, " ");
        }
      }
      function Wm(t, e) {
        if (
          (1 & t && (Uo(0, "li", 8), Uo(1, "a", 9), gi(2), Fo(), Fo()), 2 & t)
        ) {
          const t = e.$implicit;
          Ar(1),
            Zo("routerLink", "/ShowProducts/", t._id, ""),
            Ar(1),
            yi(" ", t.name, " ");
        }
      }
      function Zm(t, e) {
        if (
          (1 & t &&
            (Uo(0, "span", 19),
            Uo(1, "span", 20),
            gi(2, "\u2665"),
            Fo(),
            gi(3, "\u2665 "),
            Fo()),
          2 & t)
        ) {
          const t = e.fill;
          ri("full", 100 === t), Ar(1), ni("width", t, "%");
        }
      }
      function Qm(t, e) {
        if (1 & t) {
          const t = Ho();
          Uo(0, "div", 10),
            Uo(1, "a", 11),
            Uo(2, "div", 12),
            Lo(3, "img", 13),
            Uo(4, "div", 14),
            Uo(5, "h3", 15),
            gi(6),
            Fo(),
            Lo(7, "br"),
            Uo(8, "p", 16),
            gi(9),
            Fo(),
            Lo(10, "br"),
            Uo(11, "p", 15),
            Mo(12, Zm, 4, 4, "ng-template", null, 17, Wa),
            Uo(14, "ngb-rating", 18),
            qo("rateChange", function (n) {
              return Ge(t), (e.$implicit.rating = n);
            }),
            Fo(),
            Fo(),
            Fo(),
            Fo(),
            Fo(),
            Fo();
        }
        if (2 & t) {
          const t = e.$implicit,
            n = Ro(13);
          Ar(1),
            Zo("routerLink", "/product-details/", t._id, ""),
            Ar(2),
            Zo(
              "src",
              "https://bakery-backend-h81u.onrender.com/",
              t.photoByPath,
              "",
              hr
            ),
            Ar(3),
            mi(t.ProductName),
            Ar(3),
            yi("Rs.", t.Cost, ""),
            Ar(5),
            jo("rate", t.rating)("starTemplate", n)("readonly", !0)("max", 5);
        }
      }
      const Km = [
        { path: "", redirectTo: "/main", pathMatch: "full" },
        {
          path: "main",
          component: (() => {
            class t {
              constructor(t, e) {
                (this.productServi = t), (this.http = e);
              }
              ngOnInit() {
                this.http
                  .get("https://bakery-backend-h81u.onrender.com/api/products")
                  .pipe(
                    D((t) => {
                      const e = [];
                      for (const n in t)
                        t.hasOwnProperty(n) &&
                          e.push(
                            Object.assign(Object.assign({}, t[n]), { id: n })
                          );
                      return console.log(e), e;
                    })
                  )
                  .subscribe((t) => {
                    this.Home_products = t;
                  });
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(Io(zm), Io(wu));
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-home"]],
                decls: 31,
                vars: 0,
                consts: [
                  [2, "overflow-x", "hidden"],
                  [1, "row"],
                  [1, "col-lg-1"],
                  [1, "col-lg-10"],
                  [
                    "id",
                    "carouselExampleIndicators",
                    "data-ride",
                    "carousel",
                    1,
                    "carousel",
                    "slide",
                  ],
                  [1, "carousel-indicators"],
                  [
                    "data-target",
                    "#carouselExampleIndicators",
                    "data-slide-to",
                    "0",
                    1,
                    "active",
                  ],
                  [
                    "data-target",
                    "#carouselExampleIndicators",
                    "data-slide-to",
                    "1",
                  ],
                  [
                    "data-target",
                    "#carouselExampleIndicators",
                    "data-slide-to",
                    "2",
                  ],
                  [1, "carousel-inner"],
                  [1, "carousel-item", "active"],
                  [
                    "width",
                    "800px",
                    "height",
                    "550px",
                    "src",
                    "../../assets/bbub.jpg",
                    "alt",
                    "../../assets/cupcake-with-chocolate-cubes-1908675.jpg",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [1, "carousel-item"],
                  [
                    "width",
                    "800px",
                    "height",
                    "550px",
                    "src",
                    "../../assets/dddd.jpg",
                    "alt",
                    "../../assets/cupcake-with-chocolate-cubes-1908675.jpg",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [
                    "width",
                    "800px",
                    "height",
                    "550px",
                    "src",
                    "../../assets/buaq.jpg",
                    "alt",
                    "../../assets/cupcake-with-chocolate-cubes-1908675.jpg",
                    1,
                    "d-block",
                    "w-100",
                  ],
                  [
                    "href",
                    "#carouselExampleIndicators",
                    "role",
                    "button",
                    "data-slide",
                    "prev",
                    1,
                    "carousel-control-prev",
                  ],
                  ["aria-hidden", "true", 1, "carousel-control-prev-icon"],
                  [1, "sr-only"],
                  [
                    "href",
                    "#carouselExampleIndicators",
                    "role",
                    "button",
                    "data-slide",
                    "next",
                    1,
                    "carousel-control-next",
                  ],
                  ["aria-hidden", "true", 1, "carousel-control-next-icon"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Uo(0, "div", 0),
                    Lo(1, "br"),
                    Lo(2, "br"),
                    Uo(3, "div", 1),
                    Lo(4, "div", 2),
                    Uo(5, "div", 3),
                    Uo(6, "div", 4),
                    Uo(7, "ol", 5),
                    Lo(8, "li", 6),
                    Lo(9, "li", 7),
                    Lo(10, "li", 8),
                    Fo(),
                    Uo(11, "div", 9),
                    Uo(12, "div", 10),
                    Lo(13, "img", 11),
                    Fo(),
                    Uo(14, "div", 12),
                    Lo(15, "img", 13),
                    Fo(),
                    Uo(16, "div", 12),
                    Lo(17, "img", 14),
                    Fo(),
                    Fo(),
                    Uo(18, "a", 15),
                    Lo(19, "span", 16),
                    Uo(20, "span", 17),
                    gi(21, "Previous"),
                    Fo(),
                    Fo(),
                    Uo(22, "a", 18),
                    Lo(23, "span", 19),
                    Uo(24, "span", 17),
                    gi(25, "Next"),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Lo(26, "div", 2),
                    Fo(),
                    Lo(27, "br"),
                    Lo(28, "br"),
                    Lo(29, "br"),
                    Fo(),
                    Lo(30, "app-footer"));
                },
                directives: [$m],
                styles: [
                  '.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.column[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]{padding:0 4px}.column[_ngcontent-%COMP%]{flex:25%;max-width:25%}.column[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:8px;vertical-align:middle;width:100%}@media screen and (max-width:auto){.column[_ngcontent-%COMP%]{flex:50%;max-width:50%;flex:100%;max-width:width auto}}.container[_ngcontent-%COMP%]{width:50%}.img-thumbnail[_ngcontent-%COMP%]{width:250px;height:300px}.overlay[_ngcontent-%COMP%]{position:absolute;bottom:100%;top:7px;left:15px;right:15px;background-color:#fff;overflow:hidden;width:auto;height:0;transition:.5s ease;opacity:.9}.container[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{bottom:0;height:97%}.text[_ngcontent-%COMP%]{color:#000;font-size:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.container[_ngcontent-%COMP%]{width:auto;height:auto;border-radius:10mm}*[_ngcontent-%COMP%]{box-sizing:border-box}.container[_ngcontent-%COMP%]{position:relative}.mySlides[_ngcontent-%COMP%]{display:none}.cursor[_ngcontent-%COMP%], .next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{cursor:pointer}.next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{position:absolute;top:40%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next[_ngcontent-%COMP%]{right:0;border-radius:3px 0 0 3px}.next[_ngcontent-%COMP%]:hover, .prev[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.8)}.numbertext[_ngcontent-%COMP%]{color:#f2f2f2;font-size:12px;padding:8px 12px;position:absolute;top:0}.caption-container[_ngcontent-%COMP%]{text-align:center;background-color:#222;padding:2px 16px;color:#fff}.row[_ngcontent-%COMP%]:after{content:"";display:table;clear:both}.column[_ngcontent-%COMP%]{float:left;width:16.66%}.demo[_ngcontent-%COMP%]{opacity:.6}.active[_ngcontent-%COMP%], .demo[_ngcontent-%COMP%]:hover{opacity:1}.header[_ngcontent-%COMP%]{padding:10px 16px;background:hsla(0,0%,63.9%,.658);color:hsla(0,0%,100%,.59)}.content[_ngcontent-%COMP%]{padding:16px}.sticky[_ngcontent-%COMP%]{position:fixed;top:0;width:100%}.sticky[_ngcontent-%COMP%] + .content[_ngcontent-%COMP%]{padding-top:102px}',
                ],
              })),
              t
            );
          })(),
        },
        { path: "product-details/:id", component: Vm },
        { path: "login", component: Mm },
        { path: "register", component: jm },
        { path: "cart", component: Hm },
        {
          path: "checkout",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)();
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-checkout"]],
                decls: 2,
                vars: 0,
                template: function (t, e) {
                  1 & t && (Uo(0, "p"), gi(1, "checkout works!"), Fo());
                },
                styles: [""],
              })),
              t
            );
          })(),
        },
        {
          path: "ShowProducts/:id2",
          component: (() => {
            class t {
              constructor(t, e) {
                (this.route = t), (this.http = e);
              }
              ngOnInit() {
                let t = this.route.snapshot.paramMap.get("id2");
                console.log(t),
                  this.http
                    .get(
                      "https://bakery-backend-h81u.onrender.com/api/category/" +
                        t
                    )
                    .subscribe((t) => {
                      this.myCategory = t;
                    });
                let e = this.route.snapshot.paramMap.get("id2");
                this.http
                  .get(
                    "https://bakery-backend-h81u.onrender.com/api/productCate/" +
                      e
                  )
                  .subscribe((t) => {
                    console.log("array" + t), (this.Home_products = t);
                  });
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(Io(Qf), Io(wu));
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-show-products"]],
                decls: 10,
                vars: 2,
                consts: [
                  ["rel", "preconnect", "href", "https://fonts.gstatic.com"],
                  [
                    "href",
                    "https://fonts.googleapis.com/css2?family=Amatic+SC&family=Dancing+Script:wght@600&display=swap",
                    "rel",
                    "stylesheet",
                  ],
                  [
                    1,
                    "div",
                    2,
                    "padding",
                    "100px",
                    "text-align",
                    "center",
                    "overflow-y",
                    "hidden",
                  ],
                  ["id", "myHeader", 1, "header"],
                  [2, "font-size", "60px"],
                  [1, "row"],
                  ["class", "column", 4, "ngFor", "ngForOf"],
                  [1, "column"],
                  [2, "color", "black", 3, "routerLink"],
                  [1, "container"],
                  [
                    "height",
                    "350px",
                    1,
                    "img-thumbnail",
                    2,
                    "width",
                    "100%",
                    3,
                    "src",
                  ],
                  [1, "overlay"],
                  [
                    2,
                    "text-align",
                    "center",
                    "margin-top",
                    "auto",
                    "margin-top",
                    "20px",
                  ],
                  [2, "text-align", "center", "margin-top", "auto"],
                  ["t", ""],
                  [3, "rate", "starTemplate", "readonly", "max", "rateChange"],
                  [1, "star"],
                  [1, "half"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Lo(0, "link", 0),
                    Lo(1, "link", 1),
                    Uo(2, "div", 2),
                    Uo(3, "div", 3),
                    Uo(4, "h2", 4),
                    gi(5),
                    Fo(),
                    Fo(),
                    Lo(6, "br"),
                    Lo(7, "br"),
                    Uo(8, "div", 5),
                    Mo(9, Bm, 15, 8, "div", 6),
                    Fo(),
                    Fo()),
                    2 & t &&
                      (Ar(5),
                      yi(" ", e.myCategory.name, " Menu "),
                      Ar(4),
                      jo("ngForOf", e.Home_products));
                },
                directives: [yc, om, lp],
                styles: [
                  '.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.column[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]{padding:0 4px}.column[_ngcontent-%COMP%]{flex:25%;max-width:25%}.column[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:8px;vertical-align:middle;width:100%}@media screen and (max-width:auto){.column[_ngcontent-%COMP%]{flex:50%;max-width:50%;flex:100%;max-width:width auto}}.container[_ngcontent-%COMP%]{width:50%}.img-thumbnail[_ngcontent-%COMP%]{width:auto;height:auto}.overlay[_ngcontent-%COMP%]{position:absolute;bottom:100%;top:7px;left:15px;right:15px;background-color:#fff;overflow:hidden;width:auto;height:0;transition:.5s ease;opacity:.9}.container[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{bottom:0;height:97%}.text[_ngcontent-%COMP%]{color:#000;font-size:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.container[_ngcontent-%COMP%]{width:auto;height:auto;border-radius:10mm}*[_ngcontent-%COMP%]{box-sizing:border-box}.container[_ngcontent-%COMP%]{position:relative}.mySlides[_ngcontent-%COMP%]{display:none}.cursor[_ngcontent-%COMP%], .next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{cursor:pointer}.next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{position:absolute;top:40%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next[_ngcontent-%COMP%]{right:0;border-radius:3px 0 0 3px}.next[_ngcontent-%COMP%]:hover, .prev[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.8)}.numbertext[_ngcontent-%COMP%]{color:#f2f2f2;font-size:12px;padding:8px 12px;position:absolute;top:0}.caption-container[_ngcontent-%COMP%]{text-align:center;background-color:#222;padding:2px 16px;color:#fff}.row[_ngcontent-%COMP%]:after{content:"";display:table;clear:both}.column[_ngcontent-%COMP%]{float:left;width:16.66%}.demo[_ngcontent-%COMP%]{opacity:.6}.active[_ngcontent-%COMP%], .demo[_ngcontent-%COMP%]:hover{opacity:1}.header[_ngcontent-%COMP%]{padding:10px 16px;background:hsla(0,0%,63.9%,.658);color:rgba(250,253,253,.59);font-family:Amatic SC,cursive}.content[_ngcontent-%COMP%]{padding:16px}.sticky[_ngcontent-%COMP%]{position:fixed;top:0;width:100%}.sticky[_ngcontent-%COMP%] + .content[_ngcontent-%COMP%]{padding-top:102px}',
                  ".star[_ngcontent-%COMP%] {\n      position: relative;\n      display: inline-block;\n      font-size: 3rem;\n      color: #d3d3d3;\n    }\n    .full[_ngcontent-%COMP%] {\n      color: red;\n    }\n    .half[_ngcontent-%COMP%] {\n      position: absolute;\n      display: inline-block;\n      overflow: hidden;\n      color: red;\n    }",
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "orders",
          component: (() => {
            class t {
              constructor() {}
              ngOnInit() {}
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)();
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-orders"]],
                decls: 35,
                vars: 0,
                consts: [
                  [
                    "rel",
                    "stylesheet",
                    "type",
                    "text/css",
                    "href",
                    "//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css",
                  ],
                  [1, "panel", "panel-default", "panel-order"],
                  [1, "panel-heading", 2, "margin-left", "20px"],
                  [2, "text-align", "center"],
                  [1, "panel-body"],
                  [1, "row"],
                  [1, "container"],
                  [1, "col-md-2"],
                  [
                    "src",
                    "../../assets/Lgtv.jpg",
                    "width",
                    "150px",
                    "height",
                    "100px",
                  ],
                  [1, "col-md-10"],
                  [1, "col-md-12"],
                  [1, "pull-right"],
                  [2, "color", "black", "font-size", "20px"],
                  [1, "label", "label-info"],
                  [1, "form-group", "text-center"],
                  ["routerLink", "/"],
                  [1, "btn", "btn-outline-success"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Lo(0, "link", 0),
                    Uo(1, "div", 1),
                    Uo(2, "div", 2),
                    Uo(3, "h1", 3),
                    gi(4, "My orders"),
                    Fo(),
                    Fo(),
                    Lo(5, "hr"),
                    Uo(6, "div", 4),
                    Uo(7, "div", 5),
                    Uo(8, "div", 6),
                    Uo(9, "div", 7),
                    Lo(10, "img", 8),
                    Fo(),
                    Uo(11, "div", 9),
                    Uo(12, "div", 5),
                    Uo(13, "div", 10),
                    Uo(14, "div", 11),
                    Uo(15, "label", 12),
                    gi(16, " Dispatched "),
                    Fo(),
                    Fo(),
                    Uo(17, "span"),
                    Uo(18, "strong"),
                    gi(19, "Order name : "),
                    Fo(),
                    Fo(),
                    Lo(20, "span", 13),
                    Lo(21, "br"),
                    gi(22, " Quantity : "),
                    Lo(23, "br"),
                    gi(24, " Total cost: "),
                    Lo(25, "br"),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Lo(26, "br"),
                    Lo(27, "br"),
                    Uo(28, "div", 14),
                    Uo(29, "a", 15),
                    Uo(30, "button", 16),
                    gi(31, " Back To home "),
                    Fo(),
                    Fo(),
                    Fo(),
                    Fo(),
                    Lo(32, "br"),
                    Lo(33, "br"),
                    Lo(34, "br"),
                    Fo());
                },
                directives: [om],
                styles: [""],
              })),
              t
            );
          })(),
        },
        {
          path: "search",
          component: (() => {
            class t {
              constructor(t) {
                this.http = t;
              }
              ngOnInit() {
                this.http
                  .get(
                    "https://bakery-backend-h81u.onrender.com/api/categories"
                  )
                  .pipe(
                    D((t) => {
                      const e = [];
                      for (const n in t)
                        t.hasOwnProperty(n) &&
                          e.push(
                            Object.assign(Object.assign({}, t[n]), { id: n })
                          );
                      return console.log(e), e;
                    })
                  )
                  .subscribe((t) => {
                    this.myCategory = t;
                  }),
                  this.http
                    .get(
                      "https://bakery-backend-h81u.onrender.com/api/products"
                    )
                    .pipe(
                      D((t) => {
                        const e = [];
                        for (const n in t)
                          t.hasOwnProperty(n) &&
                            e.push(
                              Object.assign(Object.assign({}, t[n]), { id: n })
                            );
                        return console.log(e), e;
                      })
                    )
                    .subscribe((t) => {
                      this.Home_products = t;
                    });
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(Io(wu));
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-search"]],
                decls: 20,
                vars: 2,
                consts: [
                  [1, "row"],
                  ["data-spy", "scroll", 1, "container", "col-md-auto"],
                  [
                    "type",
                    "text",
                    "id",
                    "myInput",
                    "onkeyup",
                    "myFunction()",
                    "placeholder",
                    "Search for Products",
                  ],
                  [
                    "id",
                    "myUL",
                    2,
                    "height",
                    "400px",
                    "width",
                    "300px",
                    "border",
                    "1px",
                    "overflow",
                    "scroll",
                    "overflow-x",
                    "hidden",
                    "overflow-y",
                    "scroll",
                    "margin",
                    "0 auto",
                  ],
                  ["class", "nav-item dropdown", 4, "ngFor", "ngForOf"],
                  [1, "col-md-2"],
                  [
                    "type",
                    "text",
                    "id",
                    "myInput2",
                    "onkeyup",
                    "myFunction2()",
                    "placeholder",
                    "Search for Category",
                  ],
                  [
                    "id",
                    "myUL2",
                    2,
                    "height",
                    "400px",
                    "width",
                    "300px",
                    "border",
                    "none",
                    "overflow",
                    "scroll",
                    "overflow-x",
                    "hidden",
                    "overflow-y",
                    "scroll",
                    "margin",
                    "0 auto",
                  ],
                  [1, "nav-item", "dropdown"],
                  [2, "color", "black", 3, "routerLink"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Uo(0, "div", 0),
                    Uo(1, "div", 1),
                    Uo(2, "h3"),
                    gi(3, "Search Products"),
                    Fo(),
                    Lo(4, "br"),
                    Lo(5, "input", 2),
                    Lo(6, "br"),
                    Lo(7, "br"),
                    Uo(8, "ul", 3),
                    Mo(9, Gm, 3, 2, "li", 4),
                    Fo(),
                    Fo(),
                    Lo(10, "div", 5),
                    Uo(11, "div", 1),
                    Uo(12, "h3"),
                    gi(13, "Search By Category"),
                    Fo(),
                    Lo(14, "br"),
                    Lo(15, "input", 6),
                    Lo(16, "br"),
                    Lo(17, "br"),
                    Uo(18, "ul", 7),
                    Mo(19, Wm, 3, 2, "li", 4),
                    Fo(),
                    Fo(),
                    Fo()),
                    2 & t &&
                      (Ar(9),
                      jo("ngForOf", e.Home_products),
                      Ar(10),
                      jo("ngForOf", e.myCategory));
                },
                directives: [yc, om],
                styles: [
                  '@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");*[_ngcontent-%COMP%]{margin:0;padding:0;outline:0;font-family:Nunito,sans-serif}body[_ngcontent-%COMP%]{border-radius:100px;background-color:#e8eaf6}.container[_ngcontent-%COMP%]{padding:15px;width:30%;position:relative;left:400px;top:350px}.box[_ngcontent-%COMP%], .container[_ngcontent-%COMP%]{border-radius:5px;background-color:rgba(99,98,98,.438);transform:translate(-50%,-50%);text-align:center;box-shadow:0 6px 8px rgba(0,0,0,.1);transition:all .4s}.box[_ngcontent-%COMP%]{padding:5px;width:200px;left:50%;position:absolute}.container[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{text-transform:uppercase;margin-bottom:15px;color:#f8c579;border-radius:20px}.container[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{padding:10px 15px;margin-bottom:15px;width:300px;font-size:16px;border:none;border-radius:20px;text-align:center}.container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style-type:none;padding:15px 0;background-color:hsla(0,0%,69.4%,.76);transition:.4s}.container[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#212121;text-decoration:none}[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{box-shadow:inset 0 0 5px grey;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#f8c579;border-radius:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#f8c579}',
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "addCategory",
          component: (() => {
            class t {
              constructor(t) {
                this.http = t;
              }
              ngOnInit() {}
              onAddPost(t) {
                this.http
                  .post(
                    "https://bakery-backend-h81u.onrender.com/api/category/create",
                    t
                  )
                  .subscribe((t) => {
                    console.log(t),
                      alert("Welcome!! Baker, category created Successfully.");
                  });
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(Io(wu));
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-add-category"]],
                decls: 22,
                vars: 0,
                consts: [
                  [
                    "rel",
                    "stylesheet",
                    "href",
                    "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
                  ],
                  [1, "row"],
                  [1, "col-lg-4"],
                  [
                    1,
                    "container",
                    "card",
                    2,
                    "background-color",
                    "rgba(117, 117, 117, 0.671)",
                  ],
                  [1, "card-body", "mx-auto", 2, "max-width", "400px"],
                  [1, "card-title", "mt-3", "text-center"],
                  [1, "text-center"],
                  [1, "divider-text"],
                  [3, "ngSubmit"],
                  ["postForm", "ngForm"],
                  [1, "form-group", "input-group"],
                  [1, "input-group-prepend"],
                  [1, "input-group-text"],
                  [1, "fa", "fa-boxes"],
                  [
                    "required",
                    "",
                    "ngModel",
                    "",
                    "name",
                    "name",
                    "placeholder",
                    "Category Name",
                    "type",
                    "text",
                    1,
                    "form-control",
                  ],
                  [1, "form-group"],
                  ["type", "submit", 1, "btn", "button", "btn-block"],
                ],
                template: function (t, e) {
                  if (1 & t) {
                    const t = Ho();
                    Lo(0, "link", 0),
                      Uo(1, "div", 1),
                      Lo(2, "div", 2),
                      Uo(3, "div", 2),
                      Uo(4, "div", 3),
                      Uo(5, "article", 4),
                      Uo(6, "h2", 5),
                      gi(7, "Add Category"),
                      Fo(),
                      Uo(8, "p", 6),
                      gi(9, "Fill In The Required Basic Detail"),
                      Fo(),
                      Lo(10, "p", 7),
                      Uo(11, "form", 8, 9),
                      qo("ngSubmit", function () {
                        Ge(t);
                        const n = Ro(12);
                        return e.onAddPost(n.value);
                      }),
                      Uo(13, "div", 10),
                      Uo(14, "div", 11),
                      Uo(15, "span", 12),
                      Lo(16, "i", 13),
                      Fo(),
                      Fo(),
                      Lo(17, "input", 14),
                      Fo(),
                      Uo(18, "div", 15),
                      Uo(19, "button", 16),
                      gi(20, " Create Product "),
                      Fo(),
                      Fo(),
                      Fo(),
                      Fo(),
                      Fo(),
                      Fo(),
                      Lo(21, "div", 2),
                      Fo();
                  }
                },
                directives: [Kh, Ju, Hh, $u, Yh, Ku, Qh],
                styles: [
                  '.divider-text[_ngcontent-%COMP%]{position:relative;text-align:center;margin-top:15px;margin-bottom:15px}.divider-text[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{padding:7px;font-size:12px;position:relative;z-index:2}.divider-text[_ngcontent-%COMP%]:after{content:"";position:absolute;width:100%;border-bottom:1px solid #ddd;top:55%;left:0;z-index:1}.button[_ngcontent-%COMP%]{position:relative;background-color:rgba(171,173,175,.79);border:none;font-size:28px;color:#fff;padding:16px 20px;width:100%;text-align:center;transition-duration:.4s;text-decoration:none;overflow:hidden;cursor:pointer}.button[_ngcontent-%COMP%]:after{content:"";background:#3fe0e6;display:block;position:absolute;padding-top:300%;padding-left:350%;margin-left:-20px!important;margin-top:-120%;opacity:0;transition:all .8s}.button[_ngcontent-%COMP%]:active:after{padding:0;margin:0;opacity:1;transition:0s}',
                ],
              })),
              t
            );
          })(),
        },
        {
          path: "Menu",
          component: (() => {
            class t {
              constructor(t, e) {
                (this.productServi = t), (this.http = e);
              }
              ngOnInit() {
                this.http
                  .get("https://bakery-backend-h81u.onrender.com/api/products")
                  .pipe(
                    D((t) => {
                      const e = [];
                      for (const n in t)
                        t.hasOwnProperty(n) &&
                          e.push(
                            Object.assign(Object.assign({}, t[n]), { id: n })
                          );
                      return console.log(e), e;
                    })
                  )
                  .subscribe((t) => {
                    this.Home_products = t;
                  }),
                  (this.Home_products = this.Home_products.sort(
                    (t, e) => t.Cost - e.Cost
                  ));
              }
              sort(t) {
                switch (t.target.value) {
                  case "Low":
                    this.Home_products = this.Home_products.sort(
                      (t, e) => t.Cost - e.Cost
                    );
                    break;
                  case "High":
                    this.Home_products = this.Home_products.sort(
                      (t, e) => e.Cost - t.Cost
                    );
                    break;
                  case "Rating":
                    this.Home_products = this.Home_products.sort(
                      (t, e) => e.rating - t.rating
                    );
                    break;
                  default:
                    this.Home_products = this.Home_products.sort(
                      (t, e) => t.Cost - e.Cost
                    );
                }
                return this.Home_products;
              }
            }
            return (
              (t.ɵfac = function (e) {
                return new (e || t)(Io(zm), Io(wu));
              }),
              (t.ɵcmp = he({
                type: t,
                selectors: [["app-menu"]],
                decls: 17,
                vars: 1,
                consts: [
                  [1, "div", 2, "padding", "100px"],
                  ["id", "myHeader", 1, "header"],
                  [
                    2,
                    "text-align",
                    "center",
                    "font-family",
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
                  ],
                  ["id", "sort-by", 1, "sort", 3, "change"],
                  ["value", "", "selected", "", "disabled", "", "hidden", ""],
                  ["value", "Low"],
                  ["value", "High"],
                  ["value", "Rating"],
                  [1, "row"],
                  ["class", "column", 4, "ngFor", "ngForOf"],
                  [1, "column"],
                  [2, "color", "black", 3, "routerLink"],
                  [1, "container"],
                  [
                    "height",
                    "350px",
                    1,
                    "img-thumbnail",
                    2,
                    "width",
                    "100%",
                    3,
                    "src",
                  ],
                  [1, "overlay"],
                  [
                    2,
                    "text-align",
                    "center",
                    "margin-top",
                    "auto",
                    "margin-top",
                    "20px",
                  ],
                  [2, "text-align", "center", "margin-top", "auto"],
                  ["t", ""],
                  [3, "rate", "starTemplate", "readonly", "max", "rateChange"],
                  [1, "star"],
                  [1, "half"],
                ],
                template: function (t, e) {
                  1 & t &&
                    (Uo(0, "div", 0),
                    Uo(1, "div", 1),
                    Uo(2, "h2", 2),
                    gi(3, " Freshly Baked With Love "),
                    Fo(),
                    Uo(4, "select", 3),
                    qo("change", function (t) {
                      return e.sort(t);
                    }),
                    Uo(5, "option", 4),
                    gi(6, "Apply Filter"),
                    Fo(),
                    Uo(7, "option", 5),
                    gi(8, "Show Low to High Price"),
                    Fo(),
                    Uo(9, "option", 6),
                    gi(10, "Show High to Low Price"),
                    Fo(),
                    Uo(11, "option", 7),
                    gi(12, "Show High to Low Rating"),
                    Fo(),
                    Fo(),
                    Fo(),
                    Lo(13, "br"),
                    Lo(14, "br"),
                    Uo(15, "div", 8),
                    Mo(16, Qm, 15, 8, "div", 9),
                    Fo(),
                    Fo()),
                    2 & t && (Ar(16), jo("ngForOf", e.Home_products));
                },
                directives: [bh, Sh, yc, om, lp],
                styles: [
                  '.row[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.column[_ngcontent-%COMP%], .row[_ngcontent-%COMP%]{padding:0 4px}.column[_ngcontent-%COMP%]{flex:25%;max-width:25%}.column[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-top:8px;vertical-align:middle;width:100%}@media screen and (max-width:auto){.column[_ngcontent-%COMP%]{flex:50%;max-width:50%;flex:100%;max-width:width auto}}.container[_ngcontent-%COMP%]{width:50%}.img-thumbnail[_ngcontent-%COMP%]{width:250px;height:300px}.overlay[_ngcontent-%COMP%]{position:absolute;bottom:100%;top:7px;left:15px;right:15px;background-color:#fff;overflow:hidden;width:auto;height:0;transition:.5s ease;opacity:.9}.container[_ngcontent-%COMP%]:hover   .overlay[_ngcontent-%COMP%]{bottom:0;height:97%}.text[_ngcontent-%COMP%]{color:#000;font-size:20px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center}.container[_ngcontent-%COMP%]{width:auto;height:auto;border-radius:10mm}*[_ngcontent-%COMP%]{box-sizing:border-box}.container[_ngcontent-%COMP%]{position:relative}.mySlides[_ngcontent-%COMP%]{display:none}.cursor[_ngcontent-%COMP%], .next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{cursor:pointer}.next[_ngcontent-%COMP%], .prev[_ngcontent-%COMP%]{position:absolute;top:40%;width:auto;padding:16px;margin-top:-50px;color:#fff;font-weight:700;font-size:20px;border-radius:0 3px 3px 0;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-user-select:none}.next[_ngcontent-%COMP%]{right:0;border-radius:3px 0 0 3px}.next[_ngcontent-%COMP%]:hover, .prev[_ngcontent-%COMP%]:hover{background-color:rgba(0,0,0,.8)}.numbertext[_ngcontent-%COMP%]{color:#f2f2f2;font-size:12px;padding:8px 12px;position:absolute;top:0}.caption-container[_ngcontent-%COMP%]{text-align:center;background-color:#222;padding:2px 16px;color:#fff}.row[_ngcontent-%COMP%]:after{content:"";display:table;clear:both}.column[_ngcontent-%COMP%]{float:left;width:16.66%}.demo[_ngcontent-%COMP%]{opacity:.6}.active[_ngcontent-%COMP%], .demo[_ngcontent-%COMP%]:hover{opacity:1}.select[_ngcontent-%COMP%]:hover{background-color:#ddd}.header[_ngcontent-%COMP%]{padding:10px 16px;background:hsla(0,0%,63.9%,.658);color:hsla(0,0%,100%,.59)}.sort[_ngcontent-%COMP%]{background-color:rgba(202,156,96,.53);color:#000;border:none;outline:none;text-align:center}.content[_ngcontent-%COMP%]{padding:16px}.sticky[_ngcontent-%COMP%]{position:fixed;top:0;width:100%}.sticky[_ngcontent-%COMP%] + .content[_ngcontent-%COMP%]{padding-top:102px}',
                  ".star[_ngcontent-%COMP%] {\n      position: relative;\n      display: inline-block;\n      font-size: 3rem;\n      color: #d3d3d3;\n    }\n    .full[_ngcontent-%COMP%] {\n      color: red;\n    }\n    .half[_ngcontent-%COMP%] {\n      position: absolute;\n      display: inline-block;\n      overflow: hidden;\n      color: red;\n    }",
                ],
              })),
              t
            );
          })(),
        },
      ];
      let Jm = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              imports: [[vm.forRoot(Km), xc], vm],
            })),
            t
          );
        })(),
        Ym = (() => {
          class t {}
          return (
            (t.ɵmod = ge({ type: t, bootstrap: [Tm] })),
            (t.ɵinj = ut({
              factory: function (e) {
                return new (e || t)();
              },
              providers: [zm, Im, Um],
              imports: [[Xc, Jm, ju, td, mp]],
            })),
            t
          );
        })();
      (function () {
        if (ir)
          throw new Error("Cannot enable prod mode after platform setup.");
        or = !1;
      })(),
        Jc()
          .bootstrapModule(Ym)
          .catch((t) => console.error(t));
    },
    zn8P: function (t, e) {
      function n(t) {
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function () {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    },
  },
  [[0, 0]],
]);
