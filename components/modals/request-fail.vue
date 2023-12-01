<template>
    <v-dialog
        v-model="modal.isOpen"
        max-width="400"
        persistent
        transition="dialog-top-transition"
    >
        <v-card>
            <v-toolbar
              color="primary"
              dark
            >{{this.modal.title || "Ocurrió algo inesperado"}}</v-toolbar>
            <v-card-text>
                <div v-if="!!modal.showIcon" class="pt-6 text-center">
                    <img src="~/assets/img/error2.svg" alt="error">
                </div>
                <div class="text-body-1 pl-12 pr-12 pt-6">
                    <p v-if="!!modal.text">{{modal.text}}</p>
                    <p v-if="!!modal.isRequestError">Por favor vuelva a intentarlo en unos minutos.</p>
                </div>                 
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn
                    color="blue darken-1"
                    text
                    @click.stop="closeModal"
                >
                    CERRAR
                </v-btn>
            </v-card-actions>       
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapGetters } from 'vuex';

export default Vue.extend({
    computed: {
        ...mapGetters({
            modal: 'formulario/modalRequestFail',
        })
    },
    methods: {
        ...mapActions({
            closeModalRequestFail: 'formulario/closeModalRequestFail',
        }),
        closeModal() {
            if(this.modal.onclose){
                this.modal.onclose();
            }
            this.closeModalRequestFail();
        }
    }
})
</script>
