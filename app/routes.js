// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from './utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // create reusable async injectors using getAsyncInjectors factory
  const { injectReducer } = getAsyncInjectors(store);

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/HomePage/reducer'),
          import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('home', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/login',
      name: 'login',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/LoginPage/reducer'),
          import('containers/LoginPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('login', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/register',
      name: 'register',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/App/reducer'),
        import('containers/RegisterPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('search', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/search',
      name: 'search',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/SearchPage/reducer'),
        import('containers/SearchPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('search', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/search/:id',
      name: 'detail',
      getComponent(nextState, cb) {
        import('containers/DetailPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },{
      path: '/seen',
      name: 'seen',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/SearchPage/reducer'),
        import('containers/SearchPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('search', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '/bookmarked',
      name: 'bookmarked',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
        import('containers/SearchPage/reducer'),
        import('containers/SearchPage'),
      ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, component]) => {
          injectReducer('search', reducer.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },{
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
