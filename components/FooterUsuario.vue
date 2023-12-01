<template>
  <footer>
    <hr>
    <div class="cnt-footer">
      <div class="footer-usuario_contacto">
        <p>
          ¿{{ tema.textos.necesitaAyuda }}? Use nuestro
          <a :href="inteligoSabPage" target="_blank">Chat</a> o
          llámenos al T(511) 625 9500
        </p>
      </div>

      <div class="footer-usuario_desc">
        <p>
          INTELIGO SAB, es una subsidiaria de INTELIGO GROUP.
        </p>
        <hr>
        <div>
          <p>Copyright © 2021 Inteligo Group. Todos los derechos reservados.</p>
          <p>
            <a
              href="https://saonboardinginteligo.blob.core.windows.net/documentos/Términos y Condiciones ODI.pdf"
              target="_blank"
            >Términos y condiciones</a>
            |
            <a
              href="https://saonboardinginteligo.blob.core.windows.net/documentos/POLÍTICA DE PRIVACIDAD DE CLIENTES Y POTENCIALES CLIENTES - Digital Jul 2020.pdf"
              target="_blank"
            >Políticas de privacidad</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex';
import { INTELIGO_SAB_HOME_PAGE } from '~/config';
export default {
  layout: 'default',
  data() {
    return {}
  },
  computed: {
    ...mapState(['empresa', 'nombreEmpresa', 'tema']),
    inteligoSabPage: function() {
      return INTELIGO_SAB_HOME_PAGE;
    }
  },
}
</script>
<style lang="scss">
footer {
  font-size: 13px;
  text-align: center;
  hr {
    border: 1px solid #eaeaea;
  }
}
.footer-usuario_contacto {
  padding: 20px 25px 0px 25px;
  p {
    color: #000000 !important;
  }
  a {
    color: #0071e3;
  }
}
.footer-usuario_desc {
  background: #f5f5f7;
  padding: 20px 25px;
  p {
    color: #87878c !important;
  }

  hr {
    border: 1px solid #d2d2d7;
  }
  div {
    display: block;
    padding-top: 10px;
    a {
      color: #5e5e61;
      text-decoration: none;
    }
  }
}
@media (min-width: 768px) {
}
@media (min-width: 1025px) {
  footer {
    font-size: 14px;
    text-align: justify;
  }
  .footer-usuario_contacto {
    padding: 20px 100px 0px 100px;
  }
  .footer-usuario_desc {
    padding: 20px 100px;
    div {
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
    }
  }
}
@media (min-width: 1400px) {
}
</style>
