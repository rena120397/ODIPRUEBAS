export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    htmlAttrs: {
      lang: "es",
    },
    titleTemplate: "%s - onboarding-digital",
    title: "onboarding-digital",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      {
        "http-equiv": "cache-control",
        content: "no-cache",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Middleware para Ruteo BackEnd

  serverMiddleware: [
    { path: "/api", handler: "~/api/index.js" },
    "~/middleware/server/validateGenerarToken",
    "~/middleware/server/validateUpdatePerfil",
  ],

  // MIddleware para Ruteo FrontEnd
  router: { middleware: ["client/validateExternalUpdate"] },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["@/assets/css/styles.scss", "@/assets/css/icons.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [{ src: "plugins/errorHandle", mode: "client" }],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  // components: true,
  components: {
    dirs: [
      "~/components",
      "~/components/loaders/loader-global",
      "~/components/modals",
      "~/components/perfil-usuario",
      "~/components/perfil-usuario/components",
    ],
  },
  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],
  env: {
    apiCrearRUT: process.env.APIM_CREAR_RUT,
    apiCrearRUTKey: process.env.APIM_CREAR_RUT_KEY,
    apimOnBoardingKey: process.env.APIM_ONBOARDING_KEY,
    apimCrmCatalogListUrl: process.env.APIM_CRM_CATALOG_LIST_URL,
    apimCrmContactCreateUrl: process.env.APIM_CRM_CONTACT_CREATE_URL,
    apimCrmContactFindUrl: process.env.APIM_CRM_CONTACT_FIND_URL,
    apimCrmContactUpdateUrl: process.env.APIM_CRM_CONTACT_UPDATE_URL,
    apimCumplimientoValidar: process.env.APIM_CUMPLIMIENTO_VALIDAR,
    apimCustomerExisting: process.env.APIM_CUSTOMER_EXISTING,
    apimEquifaxPreguntas: process.env.APIM_EQUIFAX_PREGUNTAS,
    apimEquifaxPreguntasValidar: process.env.APIM_EQUIFAX_PREGUNTAS_VALIDAR,
    apimIbkAccountsList: process.env.APIM_IBK_ACCOUNTS_LIST,
    apimIbkAccountsValidate: process.env.APIM_IBK_ACCOUNTS_VALIDATE,
    apimIbkCustomerContact: process.env.APIM_IBK_CUSTOMER_CONTACT,
    apimIbkCustomerFind: process.env.APIM_IBK_CUSTOMER_FIND,
    apimPerfiladorConfirmar: process.env.APIM_PERFILADOR_CONFIRM,
    apimPerfiladorPreguntas: process.env.APIM_PERFILADOR_QUESTIONS,
    apimPerfiladorResultado: process.env.APIM_PERFILADOR_RESULT,
    apimSendMail: process.env.APIM_SEND_MAIL,
    apimSendMailOffice365: process.env.APIM_SEND_MAIL_OFFICE_365,
    apimSendMailSengrid: process.env.APIM_SEND_MAIL_SENGRID,
    asesorInversion: process.env.ASESOR_INVERSIONES,
    asesorInversionCertia: process.env.ASESOR_INVERSIONES_CERTIA,
    b2cPolicesDomine: process.env.B2CPOLICES_DOMINE,
    bancoKey: process.env.BANCO_KEY,
    consultarDniRucApisPeru: process.env.CONSULTAR_DNI_RUC_APIS_PERU,
    consultarDniRucApisPeruToken: process.env.CONSULTAR_DNI_RUC_APIS_PERU_TOKEN,
    correoAsesorSabTo: process.env.CORREO_ASESOR_SAB_TO,
    correoControlOperativoEnviarTo:
      process.env.CORREO_CONTROL_OPERATIVO_ENVIAR_TO,
    correoCumplimientoEnviarCC: process.env.CORREO_CUMPLIMIENTO_ENVIAR_CC,
    correoCumplimientoEnviarTo: process.env.CORREO_CUMPLIMIENTO_ENVIAR_TO,
    correoErrorTo: process.env.CORREO_ERROR_TO,
    crearRut: process.env.CREAR_RUT,
    cuentaAhorro: process.env.CUENTA_AHORRO_KEY,
    cuentaCorriente: process.env.CUENTA_CORRIENTE_KEY,
    guidCanal: process.env.GUID_CANAL,
    medioPagoKey: process.env.MEDIO_PAGO_KEY,
    monedaDolares: process.env.MONEDA_DOLARES_KEY,
    monedaSoles: process.env.MONEDA_SOLES_KEY,
    msalAppId: process.env.MSAL_APP_ID,
    msalB2CextensionAppClientId: process.env.MSAL_B2C_EXTENSION_APP_CLIENT_ID,
    msalClientId: process.env.MSAL_CLIENT_ID,
    msalClientSecret: process.env.MSAL_CLIENT_SECRET,
    msalRedirectLogout: process.env.MSAL_REDIRECT_LOGOUT,
    msalRedirectUri: process.env.MSAL_REDIRECT_URI,
    msalTenantId: process.env.MSAL_TENANT_ID,
    nacionalidad: process.env.NACIONALIDAD_KEY,
    ownerIdCertia: process.env.OWNER_ID_CERTIA_KEY,
    ownerIdSAB: process.env.OWNER_ID_SAB_KEY,
    paisEmpresa: process.env.PAIS_EMPRESA_KEY,
    tipoCustodiaKey: process.env.TIPO_CUSTODIA_KEY,
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    [
      "@dansmaculotte/nuxt-security",
      {
        options: {
          hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
          },
          // aditional headers incluye X-Frame-Options: SAMEORIGIN X-Xss-Protection: 1; mode=block X-Content-Type-Options: nosniff
          additionalHeaders: true,
        },
      },
    ],
    "@nuxtjs/gtm",
  ],
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: process.env.API_URI, // Used as fallback if no runtime config is provided
    proxy: true,
  },

  gtm:
    process.env.NODE_ENV !== "production"
      ? undefined
      : {
          id: "GTM-5VD68PQ",
          enabled: true,
          debug: false,

          pageTracking: true,
          pageViewEventName: "nuxtRoute",

          autoInit: true,
          respectDoNotTrack: true,

          scriptId: "gtm-script",
          scriptDefer: false,
          scriptURL: "https://www.googletagmanager.com/gtm.js",
          crossOrigin: false,

          noscript: true,
          noscriptId: "gtm-noscript",
          noscriptURL: "https://www.googletagmanager.com/ns.html",
        },

  // proxy: {
  //   '/api/': 'https://app-onboarding-inteligo.azurewebsites.net/'
  // },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    gtm:
      process.env.NODE_ENV !== "production"
        ? undefined
        : {
            id: "GTM-5VD68PQ",
            enabled: true,
          },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },
  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: [],
    theme: {
      themes: {
        dark: false,
        light: {
          primary: "#083165",
          accent: "#f2477d",
          secondary: "#ff9da2",
          info: "#ffc001",
          warning: "#dd5742",
          error: "#dd5742",
          success: "#47C2B1",
        },
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  server: {
    port: process.env.SERVER_PORT || 3000,
  },
};
