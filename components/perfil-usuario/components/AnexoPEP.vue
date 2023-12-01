<template>
  <v-expansion-panel v-if="mostrarAnexoPep">
    <v-expansion-panel-header class="cabecera-panel">
      <div class="p-titulo-bold">
        Anexo Personas Expuestas Políticamente
      </div>
      <span v-if="esFormularioCompleto" class="icon-check1" />
    </v-expansion-panel-header>
    <v-expansion-panel-content value="9">
      <div>
        <v-btn
          v-if="!showBotonEnviarFormulario && porcentajeRegistroTotal < 100"
          id="editar_form_pep"
          icon
          :color="tema.colorSecundario"
          class="icon-edit"
          @click="editarFormulario"
        >
          Editar <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-form ref="form7" v-model="valid7">
          <p>En los últimos cinco años<span class="dat-ob">*</span></p>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="desempenioCargoPEP"
              :disabled="!showBotonEnviarFormulario"
              input-value="true"
              value
              :color="tema.colorSecundario"
              :label="tema.textos.preguntaAnexoPep"
              @change="seleccionarPep"
            />
          </div>
          <v-container v-if="desempenioCargoPEP" fluid class="mt-30">
            <v-row>
              <v-col cols="12" md="6">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargo0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresa un cargo']"
                    placeholder="Ingresar nombre del cargo del pariente"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col cols="12" md="6">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucion0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar la institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
            <label
              for=""
            >Datos de los parientes (*) vinculados al cliente PEP (indicar
              nombres y apellidos completos)</label>
            <v-row>
              <v-col v-if="cantidadFuncionCago > 0" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreCompletoVinculado0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un nombre']"
                    placeholder="Ingrese nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidoVinculado0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un apellido']"
                    placeholder="Ingrese apellido"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoVinculado0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese parentesco']"
                    placeholder="Ingrese parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadFuncionCago > 1" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreCompletoVinculado1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un nombre']"
                    placeholder="Ingrese nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidoVinculado1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un apellido']"
                    placeholder="Ingrese apellido"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoVinculado1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingrese parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadFuncionCago > 2" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreCompletoVinculado2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un nombre']"
                    placeholder="Ingrese nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidoVinculado2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese un apellido']"
                    placeholder="Ingrese apellido"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoVinculado2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingrese parentesco']"
                    placeholder="Ingrese parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
            <v-btn
              v-if="cantidadFuncionCago < 3 && showBotonEnviarFormulario"
              height="65px"
              class="btn-profile"
              @click="cantidadFuncionCago++"
            >
              AGREGAR PARIENTE VINCULADO
            </v-btn>
          </v-container>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="participacion"
              :disabled="!showBotonEnviarFormulario"
              input-value="true"
              value
              :color="tema.colorSecundario"
              label="Mantiene una participación igual o superior al 25% del capital social, aporte o participación de una persona o ente jurídico"
              @change="seleccionarPep"
            />
          </div>
          <v-container v-if="participacion" fluid class="mt-30">
            <v-row>
              <v-col v-if="cantidadParticipacionAporte > 0" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >RUC<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="ruc0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[
                      (v) =>
                        !v ||
                        /^\d{11}(?:[-\s]\d{4})?$/.test(v) ||
                        'El número debe tener 11 dígitos',
                      (v) => !!v || 'Ingresa un RUC',
                    ]"
                    placeholder="Ingresar RUC"
                    class="input-profile"
                    solo
                    maxlength="11"
                    @keypress="validaSoloNumeros"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Razón social<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="razonSocial0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar razón socialn']"
                    placeholder="Ingresar razón social"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadParticipacionAporte > 1" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >RUC<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="ruc1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[
                      (v) =>
                        !v ||
                        /^\d{11}(?:[-\s]\d{4})?$/.test(v) ||
                        'El número debe tener 11 dígitos',
                      (v) => !!v || 'Ingresa un RUC',
                    ]"
                    placeholder="Ingresar RUC"
                    class="input-profile"
                    solo
                    maxlength="11"
                    @keypress="validaSoloNumeros"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Razón social<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="razonSocial1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar razón socialn']"
                    placeholder="Ingresar razón social"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadParticipacionAporte > 2" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >RUC<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="ruc2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[
                      (v) =>
                        !v ||
                        /^\d{11}(?:[-\s]\d{4})?$/.test(v) ||
                        'El número debe tener 11 dígitos',
                      (v) => !!v || 'Ingresa un RUC',
                    ]"
                    placeholder="Ingresar RUC"
                    class="input-profile"
                    solo
                    maxlength="11"
                    @keypress="validaSoloNumeros"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Razón social<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="razonSocial2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar razón socialn']"
                    placeholder="Ingresar razón social"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
            <v-btn
              v-if="cantidadParticipacionAporte < 3 && showBotonEnviarFormulario"
              class="btn-profile"
              height="65px"
              @click="cantidadParticipacionAporte++"
            >
              AGREGAR APORTANTE
            </v-btn>
          </v-container>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="parientePEP"
              :disabled="!showBotonEnviarFormulario"
              input-value="true"
              value
              :color="tema.colorSecundario"
              label="Algunos de sus parientes es o ha sido funcionario público o PEP"
              @change="seleccionarPep"
            />
          </div>
          <v-container v-if="parientePEP" fluid class="mt-30">
            <v-row>
              <v-col v-if="cantidadParientesPEP > 0" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoPariente0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosPariente0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar Apellidos']"
                    placeholder="Ingresar Apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombrePariente0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoPariente0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionPariente0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadParientesPEP > 1" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoPariente1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosPariente1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar apellidos']"
                    placeholder="Ingresar apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombrePariente1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoPariente1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionPariente1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadParientesPEP > 2" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoPariente2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosPariente2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar apellidos']"
                    placeholder="Ingresar apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombrePariente2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoPariente2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionPariente2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
            <v-btn
              v-if="cantidadParientesPEP < 3 && showBotonEnviarFormulario"
              class="btn-profile"
              height="65px"
              @click="cantidadParientesPEP++"
            >
              AGREGAR PARIENTE
            </v-btn>
          </v-container>
          <div class="row-infoUsuario-check">
            <v-checkbox
              v-model="funcionarioPEP"
              :disabled="!showBotonEnviarFormulario"
              input-value="true"
              value
              :color="tema.colorSecundario"
              label="Está o ha estado asociado a algún funcionario público o PEP"
              @change="seleccionarPep"
            />
          </div>
          <v-container v-if="funcionarioPEP" fluid class="mt-30">
            <v-row>
              <v-col v-if="cantidadAsociadoFuncionarioPEP > 0" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoFuncionario0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosFuncionario0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar apellidos']"
                    placeholder="Ingresar apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreFuncionario0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoFuncionario0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionFuncionario0"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadAsociadoFuncionarioPEP > 1" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoFuncionario1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosFuncionario1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar apellidos']"
                    placeholder="Ingresar apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreFuncionario1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoFuncionario1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionFuncionario1"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
              <v-col v-if="cantidadAsociadoFuncionarioPEP > 2" cols="12" md="4">
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Parentesco<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="parentescoFuncionario2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar parentesco']"
                    placeholder="Ingresar parentesco"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Apellidos<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="apellidosFuncionario2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar apellidos']"
                    placeholder="Ingresar apellidos"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Nombres<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="nombreFuncionario2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar nombre']"
                    placeholder="Ingresar nombre"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Cargo<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="cargoFuncionario2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar cargo']"
                    placeholder="Ingresar cargo"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
                <div class="row-infoUsuario">
                  <label
                    for=""
                    :class="showBotonEnviarFormulario ? '' : 'label-disabled'"
                  >Institución<span class="dat-ob">*</span></label>
                  <br>
                  <v-text-field
                    v-model="institucionFuncionario2"
                    :disabled="!showBotonEnviarFormulario"
                    :rules="[(v) => !!v || 'Ingresar institución']"
                    placeholder="Ingresar institución"
                    class="input-profile"
                    solo
                    @keypress="validarEspaciosEnBlanco"
                  />
                </div>
              </v-col>
            </v-row>
            <v-btn
              v-if="cantidadAsociadoFuncionarioPEP < 3 && showBotonEnviarFormulario"
              class="btn-profile"
              height="65px"
              @click="cantidadAsociadoFuncionarioPEP++"
            >
              AGREGAR FUNCIONARIO
            </v-btn>
          </v-container>
          <div v-if="showBotonEnviarFormulario" class="row-infoUsuario">
            <p
              v-if="mensajesError.msjErrorAvisosLegales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorAvisosLegales.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjCheck.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjCheck.mensaje }}
            </p>
            <p
              v-if="mensajesError.msjErrorAvisosLegales.mostrar"
              class="error-perfil-usuario"
            >
              {{ mensajesError.msjErrorAvisosLegales.mensaje }}
            </p>
            <v-btn
              id="guardar_form_pep"
              :disabled="!valid7 || esLoadingFormulario"
              :color="tema.colorSecundario"
              height="65px"
              @click="onClickGuardarFormulario"
              :loading="esLoadingFormulario"
            >
              {{botonGuardarText}}
            </v-btn>
          </div>
          <div v-if="formGeneradorCompletado" class="error-msj">
            {{ errorFormGeneradorCompletado }}
          </div>
        </v-form>
      </div>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script lang="ts">
import { mapState, mapGetters } from 'vuex'
import { IComputed, IData, IMethods } from '~/types/AnexoPEP.types';
import { IUsuarioInformacionAnexoPEP, IUsuarioInformacionAnexoPEPPositionHeld, IUsuarioInformacionAnexoPEPParticipationPercent, IUsuarioInformacionAnexoPEPOfficialData } from '~/types/Usuario.types';
import FormularioMixin from '~/mixins/formulario.mixin';

export default FormularioMixin.extend<IData, IMethods, IComputed>({
  data() {
    return {
      showBotonEnviarFormulario: false,
      esFormularioCompleto: false,
      esLoadingFormulario: false,
      formGeneradorCompletado: false,
      errorFormGeneradorCompletado:
        'Por favor guarde su información financiera',
      btnEditarPEP: false,
      valid7: true,
      lazy7: false,
      mensajesError: {
        msjErrorAvisosLegales: {
          mensaje: 'Ocurrió un error al guardar los avisos legales',
          mostrar: false,
        },
        msjCheck: {
          mensaje: 'Debe seleccionar al menos un valor',
          mostrar: false,
        },
      },
      funcionarioPEP: false,
      parientePEP: false,
      participacion: false,
      desempenioCargoPEP: false,
      cargo0: '',
      institucion0: '',
      cargo1: '',
      institucion1: '',
      cargo2: '',
      institucion2: '',
      nombreCompletoVinculado0: '',
      apellidoVinculado0: '',
      parentescoVinculado0: '',
      nombreCompletoVinculado1: '',
      apellidoVinculado1: '',
      parentescoVinculado1: '',
      nombreCompletoVinculado2: '',
      apellidoVinculado2: '',
      parentescoVinculado2: '',
      nombreCompletoVinculado3: '',
      parentescoVinculado3: '',
      ruc0: '', // participacion25
      razonSocial0: '',
      ruc1: '',
      razonSocial1: '',
      ruc2: '',
      razonSocial2: '',
      cantidadFuncionCago: 1,
      cantidadParticipacionAporte: 1,
      cantidadParientesPEP: 1,
      cantidadAsociadoFuncionarioPEP: 1,
      parentescoPariente0: '',
      apellidosPariente0: '',
      nombrePariente0: '',
      cargoPariente0: '',
      institucionPariente0: '',
      parentescoPariente1: '',
      apellidosPariente1: '',
      nombrePariente1: '',
      cargoPariente1: '',
      institucionPariente1: '',
      parentescoPariente2: '',
      apellidosPariente2: '',
      nombrePariente2: '',
      cargoPariente2: '',
      institucionPariente2: '',
      parentescoFuncionario0: '', // funcionario
      apellidosFuncionario0: '',
      nombreFuncionario0: '',
      cargoFuncionario0: '',
      institucionFuncionario0: '',
      parentescoFuncionario1: '',
      apellidosFuncionario1: '',
      nombreFuncionario1: '',
      cargoFuncionario1: '',
      institucionFuncionario1: '',
      parentescoFuncionario2: '',
      apellidosFuncionario2: '',
      nombreFuncionario2: '',
      cargoFuncionario2: '',
      institucionFuncionario2: '',
    }
  },
  computed: {
    ...mapState([
      'mostrarAnexoPep',
      'informacionFinancieraCompletado',
    ]),
    ...mapGetters({
      porcentajeRegistroTotal: 'porcentajeRegistroTotal'
    })
  },
  mounted() {
    this.obtenerDatosParaFormulario();
  },
  methods: {
    onClickGuardarFormulario() {
      if (this.informacionFinancieraCompletado) {
        if (
          !this.funcionarioPEP &&
          !this.parientePEP &&
          !this.participacion &&
          !this.desempenioCargoPEP
        ) {
          this.mensajesError.msjCheck.mostrar = true;
        } else {
          this.mensajesError.msjCheck.mostrar = false;
          if ((this.$refs.form7 as any).validate()) {
            this.postDatosPep();
          } else {
            this.mensajesError.msjErrorAvisosLegales.mostrar = true;
          }
        }
        this.formGeneradorCompletado = false;
      } else {
        this.formGeneradorCompletado = true;
      }
    },
    postDatosPep() {
      const dataDatosUsuario = {
        id: this.informacionUsuario.id,
        annexed_pep: {
          official_pep: this.funcionarioPEP,
          relative_pep: this.parientePEP,
          participation: this.participacion,
          position_held: this.desempenioCargoPEP,
          date: new Date(),
          annexed_pep_completed: true,
          function_or_position_held: {
            position0: this.cargo0,
            institution0: this.institucion0,
            nombreCompletoVinculado0: this.nombreCompletoVinculado0,
            parentescoVinculado0: this.parentescoVinculado0,
            apellidoVinculado0: this.apellidoVinculado0,
            nombreCompletoVinculado1: this.nombreCompletoVinculado1,
            parentescoVinculado1: this.parentescoVinculado1,
            apellidoVinculado1: this.apellidoVinculado1,
            nombreCompletoVinculado2: this.nombreCompletoVinculado2,
            parentescoVinculado2: this.parentescoVinculado2,
            apellidoVinculado2: this.apellidoVinculado2,
          },
          participation_percent: {
            ruc0: this.ruc0,
            business_name0: this.razonSocial0,
            ruc1: this.ruc1,
            business_name1: this.razonSocial1,
            ruc2: this.ruc2,
            business_name2: this.razonSocial2,
          },
          relative_public_official: {
            relationship0: this.parentescoPariente0,
            last_name0: this.apellidosPariente0,
            name0: this.nombrePariente0,
            position0: this.cargoPariente0,
            institution0: this.institucionPariente0,
            relationship1: this.parentescoPariente1,
            last_name1: this.apellidosPariente1,
            name1: this.nombrePariente1,
            position1: this.cargoPariente1,
            institution1: this.institucionPariente1,
            relationship2: this.parentescoPariente2,
            last_name2: this.apellidosPariente2,
            name2: this.nombrePariente2,
            position2: this.cargoPariente2,
            institution2: this.institucionPariente2,
          },
          associate_public_officials: {
            relationship0: this.parentescoFuncionario0,
            last_name0: this.apellidosFuncionario0,
            name0: this.nombreFuncionario0,
            position0: this.cargoFuncionario0,
            institution0: this.institucionFuncionario0,
            relationship1: this.parentescoFuncionario1,
            last_name1: this.apellidosFuncionario1,
            name1: this.nombreFuncionario1,
            position1: this.cargoFuncionario1,
            institution1: this.institucionFuncionario1,
            relationship2: this.parentescoFuncionario2,
            last_name2: this.apellidosFuncionario2,
            name2: this.nombreFuncionario2,
            position2: this.cargoFuncionario2,
            institution2: this.institucionFuncionario2,
          },
          number_position_held: this.cantidadFuncionCago,
          number_participation_percent: this.cantidadParticipacionAporte,
          number_relative_public_official: this.cantidadParientesPEP,
          number_associate_public_officials: this.cantidadAsociadoFuncionarioPEP,
        },
      }
      this.esLoadingFormulario = true;
      this.$axios
        .post('/api/annexed-pep', dataDatosUsuario)
        .then(() => {
          this.showBotonEnviarFormulario = false;
          this.esFormularioCompleto = true;
          this.esLoadingFormulario = false;
          this.mensajesError.msjErrorAvisosLegales.mostrar = false;
          this.$store.commit('setInformacionAnexoPEPCompletado', true);
          this.actualizarInformacionUsuario();
          this.clearPanelSelected();
        })
        .catch((error) => {
          alert(error);
          this.mensajesError.msjErrorAvisosLegales.mostrar = true;
          this.esLoadingFormulario = false;
        })
    },
    actualizarInformacionUsuario(){
      const annexed_pep: IUsuarioInformacionAnexoPEP = !!this.informacionUsuario?.annexed_pep ? {...this.informacionUsuario.annexed_pep} : {};

      annexed_pep.official_pep = this.funcionarioPEP;
      annexed_pep.relative_pep = this.parientePEP;
      annexed_pep.participation = this.participacion;
      annexed_pep.position_held = this.desempenioCargoPEP;
      annexed_pep.number_position_held = this.cantidadFuncionCago;
      annexed_pep.number_participation_percent = this.cantidadParticipacionAporte;
      annexed_pep.number_relative_public_official = this.cantidadParientesPEP;
      annexed_pep.number_associate_public_officials = this.cantidadAsociadoFuncionarioPEP;

      const function_or_position_held: IUsuarioInformacionAnexoPEPPositionHeld = !this.informacionUsuario?.annexed_pep?.function_or_position_held ? {} : {...this.informacionUsuario.annexed_pep.function_or_position_held}


      function_or_position_held.position0 = this.cargo0;
      function_or_position_held.institution0 = this.institucion0;
      function_or_position_held.nombreCompletoVinculado0 = this.nombreCompletoVinculado0;
      function_or_position_held.parentescoVinculado0 = this.parentescoVinculado0;
      function_or_position_held.apellidoVinculado0 = this.apellidoVinculado0;
      function_or_position_held.nombreCompletoVinculado1 = this.nombreCompletoVinculado1;
      function_or_position_held.parentescoVinculado1 = this.parentescoVinculado1;
      function_or_position_held.apellidoVinculado1 = this.apellidoVinculado1;
      function_or_position_held.nombreCompletoVinculado2 = this.nombreCompletoVinculado2;
      function_or_position_held.parentescoVinculado2 = this.parentescoVinculado2;
      function_or_position_held.apellidoVinculado2 = this.apellidoVinculado2;

      const participation_percent: IUsuarioInformacionAnexoPEPParticipationPercent = !this.informacionUsuario?.annexed_pep?.participation_percent ? {} :  {...this.informacionUsuario.annexed_pep.participation_percent};
      
      participation_percent.ruc0 = this.ruc0;
      participation_percent.business_name0 = this.razonSocial0;
      participation_percent.ruc1 = this.ruc1;
      participation_percent.business_name1 = this.razonSocial1;
      participation_percent.ruc2 = this.ruc2;
      participation_percent.business_name2 = this.razonSocial2;


      const relative_public_official: IUsuarioInformacionAnexoPEPOfficialData = !this.informacionUsuario?.annexed_pep?.relative_public_official ? {} :  {...this.informacionUsuario.annexed_pep.relative_public_official}


      relative_public_official.relationship0 = this.parentescoPariente0;
      relative_public_official.last_name0 = this.apellidosPariente0;
      relative_public_official.name0 = this.nombrePariente0;
      relative_public_official.position0 = this.cargoPariente0;
      relative_public_official.institution0 = this.institucionPariente0;
      relative_public_official.relationship1 = this.parentescoPariente1;
      relative_public_official.last_name1 = this.apellidosPariente1;
      relative_public_official.name1 = this.nombrePariente1;
      relative_public_official.position1 = this.cargoPariente1;
      relative_public_official.institution1 = this.institucionPariente1;
      relative_public_official.relationship2 = this.parentescoPariente2;
      relative_public_official.last_name2 = this.apellidosPariente2;
      relative_public_official.name2 = this.nombrePariente2;
      relative_public_official.position2 = this.cargoPariente2;
      relative_public_official.institution2 = this.institucionPariente2;

      const associate_public_officials: IUsuarioInformacionAnexoPEPOfficialData = !this.informacionUsuario?.annexed_pep?.associate_public_officials ? {} :  {...this.informacionUsuario.annexed_pep.associate_public_officials}

      associate_public_officials.relationship0 = this.parentescoFuncionario0;
      associate_public_officials.last_name0 = this.apellidosFuncionario0;
      associate_public_officials.name0 = this.nombreFuncionario0;
      associate_public_officials.position0 = this.cargoFuncionario0;
      associate_public_officials.institution0 = this.institucionFuncionario0;
      associate_public_officials.relationship1 = this.parentescoFuncionario1;
      associate_public_officials.last_name1 = this.apellidosFuncionario1;
      associate_public_officials.name1 = this.nombreFuncionario1;
      associate_public_officials.position1 = this.cargoFuncionario1;
      associate_public_officials.institution1 = this.institucionFuncionario1;
      associate_public_officials.relationship2 = this.parentescoFuncionario2;
      associate_public_officials.last_name2 = this.apellidosFuncionario2;
      associate_public_officials.name2 = this.nombreFuncionario2;
      associate_public_officials.position2 = this.cargoFuncionario2;
      associate_public_officials.institution2 = this.institucionFuncionario2;

      
      this.actionUpdateInformacionUsuario({
        ...this.informacionUsuario, 
        annexed_pep: {
          ...annexed_pep,
          function_or_position_held,
          participation_percent,
          relative_public_official,
          associate_public_officials
          }
        }
        );
    },
    seleccionarPep() {
      this.mensajesError.msjCheck.mostrar = false
    },
    obtenerDatosParaFormulario() {
      
      this.showBotonEnviarFormulario = !this.informacionUsuario.annexed_pep?.annexed_pep_completed;
      if (this.informacionUsuario.annexed_pep) {
        
        this.esFormularioCompleto = this.informacionUsuario.annexed_pep.annexed_pep_completed || false;


        this.funcionarioPEP = this.informacionUsuario.annexed_pep.official_pep || false;
        this.parientePEP = this.informacionUsuario.annexed_pep.relative_pep || false;
        this.participacion = this.informacionUsuario.annexed_pep.participation || false;
        this.desempenioCargoPEP = this.informacionUsuario.annexed_pep.position_held || false;
        // inputs 
        this.cargo0 = this.informacionUsuario.annexed_pep.function_or_position_held?.position0 || '';
        this.institucion0 = this.informacionUsuario.annexed_pep.function_or_position_held?.institution0 || '';
        this.nombreCompletoVinculado0 = this.informacionUsuario.annexed_pep.function_or_position_held?.nombreCompletoVinculado0 || '';
        this.parentescoVinculado0 = this.informacionUsuario.annexed_pep.function_or_position_held?.parentescoVinculado0 || '';
        this.apellidoVinculado0 = this.informacionUsuario.annexed_pep.function_or_position_held?.apellidoVinculado0 || '';
        this.nombreCompletoVinculado1 = this.informacionUsuario.annexed_pep.function_or_position_held?.nombreCompletoVinculado1 || '';
        this.parentescoVinculado1 = this.informacionUsuario.annexed_pep.function_or_position_held?.parentescoVinculado1 || '';
        this.apellidoVinculado1 = this.informacionUsuario.annexed_pep.function_or_position_held?.apellidoVinculado1 || '';
        this.nombreCompletoVinculado2 = this.informacionUsuario.annexed_pep.function_or_position_held?.nombreCompletoVinculado2 || '';
        this.parentescoVinculado2 = this.informacionUsuario.annexed_pep.function_or_position_held?.parentescoVinculado2 || '';
        this.apellidoVinculado2 = this.informacionUsuario.annexed_pep.function_or_position_held?.apellidoVinculado2 || '';
        this.ruc0 = this.informacionUsuario.annexed_pep.participation_percent?.ruc0 || '';
        this.razonSocial0 = this.informacionUsuario.annexed_pep.participation_percent?.business_name0 || '';
        this.ruc1 = this.informacionUsuario.annexed_pep.participation_percent?.ruc1 || '';
        this.razonSocial1 = this.informacionUsuario.annexed_pep.participation_percent?.business_name1 || '';
        this.ruc2 = this.informacionUsuario.annexed_pep.participation_percent?.ruc2 || '';
        this.razonSocial2 = this.informacionUsuario.annexed_pep.participation_percent?.business_name2 || '';
        // // pariente 
        this.parentescoPariente0 = this.informacionUsuario.annexed_pep.relative_public_official?.relationship0 || '';
        this.apellidosPariente0 = this.informacionUsuario.annexed_pep.relative_public_official?.last_name0 || '';
        this.nombrePariente0 = this.informacionUsuario.annexed_pep.relative_public_official?.name0 || '';
        this.cargoPariente0 = this.informacionUsuario.annexed_pep.relative_public_official?.position0 || '';
        this.institucionPariente0 = this.informacionUsuario.annexed_pep.relative_public_official?.institution0 || '';
        this.parentescoPariente1 = this.informacionUsuario.annexed_pep.relative_public_official?.relationship1 || '';
        this.apellidosPariente1 = this.informacionUsuario.annexed_pep.relative_public_official?.last_name1 || '';
        this.nombrePariente1 = this.informacionUsuario.annexed_pep.relative_public_official?.name1 || '';
        this.cargoPariente1 = this.informacionUsuario.annexed_pep.relative_public_official?.position1 || '';
        this.institucionPariente1 = this.informacionUsuario.annexed_pep.relative_public_official?.institution1 || '';
        this.parentescoPariente2 = this.informacionUsuario.annexed_pep.relative_public_official?.relationship2 || '';
        this.apellidosPariente2 = this.informacionUsuario.annexed_pep.relative_public_official?.last_name2 || '';
        this.nombrePariente2 = this.informacionUsuario.annexed_pep.relative_public_official?.name2 || '';
        this.cargoPariente2 = this.informacionUsuario.annexed_pep.relative_public_official?.position2 || '';
        this.institucionPariente2 = this.informacionUsuario.annexed_pep.relative_public_official?.institution2 || '';
        // funcionario
        this.parentescoFuncionario0 = this.informacionUsuario.annexed_pep.associate_public_officials?.relationship0 || '';
        this.apellidosFuncionario0 = this.informacionUsuario.annexed_pep.associate_public_officials?.last_name0 || '';
        this.nombreFuncionario0 = this.informacionUsuario.annexed_pep.associate_public_officials?.name0 || '';
        this.cargoFuncionario0 = this.informacionUsuario.annexed_pep.associate_public_officials?.position0 || '';
        this.institucionFuncionario0 = this.informacionUsuario.annexed_pep.associate_public_officials?.institution0 || '';
        this.parentescoFuncionario1 = this.informacionUsuario.annexed_pep.associate_public_officials?.relationship1 || '';
        this.apellidosFuncionario1 = this.informacionUsuario.annexed_pep.associate_public_officials?.last_name1 || '';
        this.nombreFuncionario1 = this.informacionUsuario.annexed_pep.associate_public_officials?.name1 || '';
        this.cargoFuncionario1 = this.informacionUsuario.annexed_pep.associate_public_officials?.position1 || '';
        this.institucionFuncionario1 = this.informacionUsuario.annexed_pep.associate_public_officials?.institution1 || '';
        this.parentescoFuncionario2 = this.informacionUsuario.annexed_pep.associate_public_officials?.relationship2 || '';
        this.apellidosFuncionario2 = this.informacionUsuario.annexed_pep.associate_public_officials?.last_name2 || '';
        this.nombreFuncionario2 = this.informacionUsuario.annexed_pep.associate_public_officials?.name2 || '';
        this.cargoFuncionario2 = this.informacionUsuario.annexed_pep.associate_public_officials?.position2 || '';
        this.institucionFuncionario2 = this.informacionUsuario.annexed_pep.associate_public_officials?.institution2 || '';
        
        // cantidades
        this.cantidadFuncionCago = this.informacionUsuario.annexed_pep.number_position_held || 1;
        this.cantidadParticipacionAporte = this.informacionUsuario.annexed_pep.number_participation_percent || 1;
        this.cantidadParientesPEP = this.informacionUsuario.annexed_pep.number_relative_public_official || 1;
        this.cantidadAsociadoFuncionarioPEP = this.informacionUsuario.annexed_pep.number_associate_public_officials || 1;

        this.$store.commit('setInformacionAnexoPEPCompletado',this.informacionUsuario.annexed_pep.annexed_pep_completed)
      }
    },
  },
})
</script>

<style>
.st_sab .btn-profile {
  border: 1px solid #0084f8;
  color: #0084f8;
  background-color: transparent !important;
}
.st_certia .btn-profile {
  border: 1px solid #9c732b;
  color: #9c732b;
  background-color: transparent !important;
}
</style>
