module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('karma-html-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false, // deja visible los resultados en el navegador
      jasmine: {
        timeoutInterval: 30000 // aumentar el timeout para tests lentos
      }
    },
    jasmineHtmlReporter: {
      suppressAll: true // elimina los logs duplicados en el output
    },
    reporters: ['progress', 'kjhtml', 'coverage', 'junit', 'html'],
    port: 9876,  // puerto personalizado
    colors: true,
    logLevel: config.LOG_INFO,
    
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' },
        { type: 'lcov' }
      ],
      fixWebpackSourcePaths: true
    },

    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    htmlReporter: {
      outputDir: 'karma-html',
      focusOnFailures: true,
      namedFiles: true
    },

    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu', '--disable-web-security', '--disable-dev-shm-usage']
      }
    },
    singleRun: false,
    restartOnFileChange: true,
    failOnEmptyTestSuite: false, // evita errores si no hay tests
    browserNoActivityTimeout: 60000, // timeout para actividad del navegador
    captureTimeout: 60000 // timeout para capturar el navegador
  });
};
