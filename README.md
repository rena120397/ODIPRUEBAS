# Onboarding Digital Inteligo
_Aplicación Web para las subsidiarias de Inteligo SAB y Certia. Ayuda a los prospectos a darse de alta de manera digital_
_https://www.figma.com/file/xPMCk6qutT1A0DiLAoicnr/Onboarding-SAB-CERTIA-Navia?node-id=1223%3A0_

#### Características del proyecto:

1. Framework SSR:

    NuxtJS 2.14.5
    Framework basado en Vuejs (https://nuxtjs.org/docs/2.x/get-started/installation)

2. Base de datos

    COSMOS DB

3. Framework Backend:

    Express - NodeJS

4. UI framework

    Vuetify (https://vuetifyjs.com/en/)

5. Características

    SSR: Renderiza en cliente y servidor

    Axios: Http request 

6. Herramientas de revestimiento

    Eslint
    
    Prettier

#### Diseño de la web

    El diseño del la web se encuentra en un proyecto llamado "Onboarding SAB/CERTIA/NAVIA" dentro de la cuenta de figma de inteligo.digital@gmail.com.

    
[Figma](https://www.figma.com/file/xPMCk6qutT1A0DiLAoicnr/Onboarding-SAB-CERTIA-Navia?node-id=1742%3A0)


#### Proceso para cambios


* Se sugiere manejar los cambios a través de Oscar Aledo BP de ODI.


####  Empezar con el proyecto
1. Clonar el proyecto
2. Instalar las dependencias: npm install

##### En local (running on http://localhost:3000.)
Lee las variables de entorno desde el archivo `.env`

        npm run dev
##### En ambiente de desarrollo
Básicamente lo mismo que el entorno local. Se busca simular el recurso desplegado en `azure` (app-onboarding-digital)
Lee las variables de entorno desde el archivo `.env.development`

        npm run start:dev
##### En ambiente de producción
La aplicación apunta a las apis del ambiente de produccíon
Lee las variables de entorno desde el archivo `.env.production`

        npm run start:prod
📌 Importante: el modo producción habilitará el GTM
##### En ambiente de certificación
La aplicación apunta a las apis del ambiente de certificación
Lee las variables de entorno desde el archivo `.env.certificacion`

        npm run start:cert
#### Pasos deploy

* Ejecutar el siguiente comando:

        npm run build (la compilación dará error si los assets-img sobrepasan el tamaño recomendado por nuxt y si existen console.log en la aplicación)
        git add .
        git commit -m "ticket de Jira"
        git push origin rama

        Importante 📌
        * Asegurarse de que el archivo de configuración de msal apunte correctamente 
        * gtm este habilitado solo en producción
        * El ENV en nuxt.config debe apuntar al ambiente deseado
        * Al hacer pruebas en producción tener cuidado de no ejecutar la llamada al RPA ya que el RPA se conectará con Wari - Cavali para crear el RUT

        Recomendaciones✒️
        * Trabajar con imágenes en formato svg
        * Trabajar con un compresor de imágenes [Compresor de imágenes](https://tinypng.com/)

#### Consultas frecuentes

* Consulta DNI de prospecto: _Los asesores que envian invitaciones directas a clientes están al pendiente del estado del registro del cliente_ CONSULTAR LA BASE DE DATOS Y APLICAR EL FILTRO WHERE c.identityDocument.number = "DNIDELPROSPECTO"

* Consulta "masiva "de personas que completaron ODI o en que porcentaje se quedaron _(se recomienda que para esta data se consulte el DASHBOARD DE ODI)_

    1. Abrir NEW SQL QUERY 
    2. Querys mas solicitados
       * Total de personas que completaron ODI: _SELECT * FROM c where c.completed_profile_percentage = 100_
       * Total de personas del segmento SAB que completaron ODI: _SELECT * FROM c where c.completed_profile_percentage = 100 and c.companyJoined = 'sab'_
       * Total de personas del segmento CERTIA que completaron ODI: _SELECT * FROM c where c.completed_profile_percentage = 100 and c.companyJoined = 'certia'_
       * Total de personas que completaron ODI y fueron observadas por cumplimiento: _SELECT * FROM c where c.completed_profile_percentage = 100 and c.compliance_information.status = 'OBSERVADO'_
       * Total de personas que completaron ODI y no fueron observadas por cumplimiento: _SELECT * FROM c where c.completed_profile_percentage = 100 and c.compliance_information.status = 'PROCEDENTE'_
       * Total de personas que completaron ODI desde Julio (ejemplo): _SELECT * FROM c where c.completed_profile_percentage = 100 and c.date_registered >= "2021-07-01"

### Consultas ODI
    Dashboard: [POWERBI] (https://app.powerbi.com/groups/me/reports/1fdc56e7-bc81-481f-95bb-c08f2ae2bde9/ReportSectionb3a9b45599cac00ac326)
    * Solicitar accesos a Giancarlo Martinez
    * Si se consulta por clientes con RUT, hacer la solicitud a Oscar para sacar un reporte de CRM

### LINK de la colección en postman
https://www.getpostman.com/collections/280d76e8973b0bc235d0
