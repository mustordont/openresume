// method
export function apiRequest() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod: any = descriptor.value;
    descriptor.value = function(...args: any[]): any {
      const {commit, dispatch} = args[0];
      dispatch('addWorker', null, {root: true}).then((current) => {
        originalMethod.apply(this, args)
          .catch((error) => {
            commit('setError', error.message, {root: true});
          })
          .finally(() => dispatch('removeWorker', {current}, {root: true}));
      });
    };

    return descriptor;
  };
}
