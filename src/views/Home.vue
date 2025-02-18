<template>
    <Header />
    <v-container class=" d-flex mt-5 ">
        <v-row>
            <v-col :cols="$vuetify.display.smAndUp ? '5' : '12'">
                <v-card class="mt-2" elevation="0">
                    <div class="d-flex align-center justify-center justify-space-between ma-2">
                        <v-card-title class="d-flex">
                            PAGE DP TGCC
                        </v-card-title>
                        <div class="d-flex justify-center">
                            <input type="file" ref="fileInput" @change="uploadPdf" accept="application/pdf" hidden />
                            <v-btn class="text-none text-subtitle-1" prepend-icon="mdi-upload" color="#5865f2"  @click="selectFile"  variant="flat">
                                Ajouter PDF
                            </v-btn>
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <v-card-text class="mt-2">
                        <iframe v-if="pdfUrl" :src="pdfUrl" width="100%" height="600px"></iframe>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col :cols="$vuetify.display.smAndUp ? '7' : '12'">
                <v-card class="mt-2" elevation="1" variant="outlined" :disabled="analyze_loading"
                    :analyze_loading="analyze_loading">
                    <template v-slot:loader="{ isActive }">
                        <v-progress-linear :active="analyze_loading" color="red-darken-4" height="5"
                            indeterminate></v-progress-linear>
                    </template>
                    <div class="d-flex justify-space-between ma-2">
                        <v-card-title class="d-flex">
                            Demo Project
                        </v-card-title>
                        <div class="d-flex justify-center">
                            <v-btn class="text-none text-subtitle-1" prepend-icon="mdi-microsoft-excel" color="green"  @click="downloadExcel" variant="flat">
                                Excel
                            </v-btn>
                        </div>
                    </div>
                    <v-divider></v-divider>
                    <v-card-text class="mt-2">
                        <h3 class="text-red-darken-4 mb-3">Informations Générales</h3>
                        <h4 class="mt-1">Chantier <span :class="getColorClass(chantier_confidence)">{{
                            formattedValue(chantier_confidence)
                                }}</span></h4>
                        <v-text-field density="compact" v-model="chantier" color="red-darken-4"></v-text-field>
                        <h4 class="mt-1">Maitre d'ouvrage <span :class="getColorClass(maitre_ouvrage_confidence)">{{
                            formattedValue(maitre_ouvrage_confidence) }}</span></h4>
                        <v-text-field density="compact" v-model="maitre_ouvrage" color="red-darken-4"></v-text-field>
                        <h4 class="mt-1">Lot <span :class="getColorClass(lot_confidence)">{{
                            formattedValue(lot_confidence) }}</span></h4>
                        <v-text-field density="compact" v-model="lot" color="red-darken-4"></v-text-field>
                        <h4 class="mt-1">Sous Traitant <span :class="getColorClass(sstraitant_confidence)">{{
                            formattedValue(sstraitant_confidence) }}</span></h4>
                        <v-text-field density="compact" v-model="sstraitant" color="red-darken-4"></v-text-field>
                        <h4 class="mt-1">DP Numéro <span :class="getColorClass(numdp_confidence)">{{
                            formattedValue(numdp_confidence)
                                }}</span></h4>
                        <v-text-field density="compact" v-model="numdp" color="red-darken-4"></v-text-field>
                        <h4 class="mt-1">Date DP <span :class="getColorClass(date_dp_confidence)">{{
                            formattedValue(date_dp_confidence)
                                }}</span></h4>
                        <v-text-field density="compact" v-model="date_dp" color="red-darken-4"></v-text-field>
                        <!-- <v-row class="text-center">
                            <v-col cols="6">
                                <h4 class="mt-1">Marché de Base</h4>
                                <v-text-field density="compact" v-model="montant_marche_base"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <h4 class="mt-1">Marché y compris Avenants</h4>
                                <v-text-field density="compact" v-model="montant_marche_total"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row class="text-center">
                            <v-col cols="6">
                                <h4 class="mt-1">Avance</h4>
                                <v-text-field density="compact" v-model="avance" color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <h4 class="mt-1">Montant Avance</h4>
                                <v-text-field density="compact" v-model="montant_avance"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row> -->

                        <h3 class="text-red-darken-4 mb-3"> 0-Approvisionnement Matériaux Dhs TTC</h3>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(appro_actuel_ttc_confidence)">{{
                                            formattedValue(appro_actuel_ttc_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="appro_actuel_ttc"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(appro_precedent_ttc_confidence)">{{
                                            formattedValue(appro_precedent_ttc_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="appro_precedent_ttc"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(appro_mensuel_ttc_confidence)">{{
                                            formattedValue(appro_mensuel_ttc_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="appro_mensuel_ttc"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>

                        <h3 class="text-red-darken-4 mb-3">1-Détails des Travaux Réalisés</h3>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(montant_travaux_actuel_confidence)">{{
                                            formattedValue(montant_travaux_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_travaux_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(montant_travaux_precedent_confidence)">{{
                                            formattedValue(montant_travaux_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_travaux_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(montant_travaux_mensuel_confidence)">{{
                                            formattedValue(montant_travaux_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_travaux_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>

                        <h3 class="text-red-darken-4 mb-3">2-Retenues (Hors Approvisionnement)</h3>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(montant_retenues_actuel_confidence)">{{
                                            formattedValue(montant_retenues_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_retenues_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(montant_retenues_precedent_confidence)">{{
                                            formattedValue(montant_retenues_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_retenues_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(montant_retenues_mensuel_confidence)">{{
                                            formattedValue(montant_retenues_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_retenues_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>

                        <h3 class="text-red-darken-4 mb-3">3-Libération Retenues</h3>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(montant_libretenues_actuel_confidence)">{{
                                            formattedValue(montant_libretenues_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_libretenues_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(montant_libretenues_precedent_confidence)">{{
                                            formattedValue(montant_libretenues_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_libretenues_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(montant_libretenues_mensuel_confidence)">{{
                                            formattedValue(montant_libretenues_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_libretenues_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>

                        <h3 class="text-red-darken-4 mb-3">TOTAL</h3>
                        <h4>TOTAL (1)-(2)+(3)</h4>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(total_ht_actuel_confidence)">{{
                                            formattedValue(total_ht_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="total_ht_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(total_ht_precedent_confidence)">{{
                                            formattedValue(total_ht_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="total_ht_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(total_ht_mensuel_confidence)">{{
                                            formattedValue(total_ht_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="total_ht_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>
                        <h4>TVA 20%</h4>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(tva_actuel_confidence)">{{
                                            formattedValue(tva_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="tva_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(tva_precedent_confidence)">{{
                                            formattedValue(tva_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="tva_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(tva_mensuel_confidence)">{{
                                            formattedValue(tva_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="tva_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>
                        <h4>RESTE DU A L'ENTREPRISE TTC - (0) </h4>
                        <v-row class="text-center">
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">ACTUEL <span
                                        :class="getColorClass(montant_du_actuel_confidence)">{{
                                            formattedValue(montant_du_actuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_du_actuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">PRECEDENT <span
                                        :class="getColorClass(montant_du_precedent_confidence)">{{
                                            formattedValue(montant_du_precedent_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_du_precedent"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                            <v-col cols="4">
                                <h5 class="text-grey-darken-3 mt-1">MENSUEL <span
                                        :class="getColorClass(montant_du_mensuel_confidence)">{{
                                            formattedValue(montant_du_mensuel_confidence) }}</span></h5>
                                <v-text-field density="compact" v-model="montant_du_mensuel"
                                    color="red-darken-4"></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { exportToExcel } from "@/utils/excelUtils";
import Header from '../components/Header.vue'
import { useDisplay } from "vuetify";

import AWS from "aws-sdk";

export default {
    setup() {
        const { display } = useDisplay();
    },

    components: {
        Header,
    },

    data() {
        return {
            feedbacks: [],
            selectedFile: null,
            pdfUrl: "",
            analyze_loading: false,
            //extracted data
            chantier: "",
            chantier_confidence: "",
            maitre_ouvrage: "",
            maitre_ouvrage_confidence: "",
            lot: "",
            lot_confidence: "",
            sstraitant: "",
            sstraitant_confidence: "",
            numdp: "",
            numdp_confidence: "",
            date_dp: "",
            date_dp_confidence: "",
            /// not included
            montant_marche_base: "",
            montant_marche_base_confidence: "",
            montant_marche_total: "",
            montant_marche_total_confidence: "",
            avance: "",
            avance_confidence: "",
            montant_avance: "",
            montant_avance_confidence: "",
            ///
            appro_actuel_ttc: "",
            appro_actuel_ttc_confidence: "",
            appro_precedent_ttc: "",
            appro_precedent_ttc_confidence: "",
            appro_mensuel_ttc: "",
            appro_mensuel_ttc_confidence: "",
            montant_travaux_actuel: "",
            montant_travaux_actuel_confidence: "",
            montant_travaux_precedent: "",
            montant_travaux_precedent_confidence: "",
            montant_travaux_mensuel: "",
            montant_travaux_mensuel_confidence: "",
            montant_retenues_actuel: "",
            montant_retenues_actuel_confidence: "",
            montant_retenues_precedent: "",
            montant_retenues_precedent_confidence: "",
            montant_retenues_mensuel: "",
            montant_retenues_mensuel_confidence: "",
            montant_libretenues_actuel: "",
            montant_libretenues_actuel_confidence: "",
            montant_libretenues_precedent: "",
            montant_libretenues_precedent_confidence: "",
            montant_libretenues_mensuel: "",
            montant_libretenues_mensuel_confidence: "",
            total_ht_actuel: "",
            total_ht_actuel_confidence: "",
            total_ht_precedent: "",
            total_ht_precedent_confidence: "",
            total_ht_mensuel: "",
            total_ht_mensuel_confidence: "",
            tva_actuel: "",
            tva_actuel_confidence: "",
            tva_precedent: "",
            tva_precedent_confidence: "",
            tva_mensuel: "",
            tva_mensuel_confidence: "",
            montant_du_actuel: "",
            montant_du_actuel_confidence: "",
            montant_du_precedent: "",
            montant_du_precedent_confidence: "",
            montant_du_mensuel: "",
            montant_du_mensuel_confidence: "",
        };
    },

    methods: {
        getColorClass(val) {
            if (val < 0.5) return 'text-red';
            if (val >= 0.5 && val < 0.8) return 'text-orange';
            return 'text-green';
        },
        formattedValue(val) {
            if (val == '') { return '' }
            return `${(val * 100).toFixed(0)}%`;
        },
        selectFile(event) {
            this.$refs.fileInput.click();
        }, async uploadPdf(event) {
            const file = event.target.files?.[0]; // Safely access the file
            if (!file) {
                console.warn("No file selected!");
                return;
            }

            const s3 = new AWS.S3({
                accessKeyId:process.env.VUE_APP_AWSACCCESSKEY ,
                secretAccessKey:process.env.VUE_APP_AWSSECRETKEY,
                region:process.env.VUE_APPAWSREGION,
            });

            const params = {
                Bucket: "matjariimages",
                Key: `pdfs/${Date.now()}-${file.name}`,
                Body: file,
                ContentType: "application/pdf",
                ACL: "public-read",
            };

            try {
                // Upload the PDF to S3
                const { Location } = await s3.upload(params).promise();
                this.pdfUrl = Location;
                this.analyze_loading = true
                // Call the analyze API with the PDF URL
                const analyzeResponse = await fetch('https://tgccserver.vercel.app/analyze', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        formUrl: this.pdfUrl,
                    }),
                });

                if (!analyzeResponse.ok) {
                    throw new Error('Failed to call analyze API');
                }

                const analyzeData = await analyzeResponse.json();
                this.chantier = analyzeData.chantier
                this.chantier_confidence = analyzeData.chantier_confidence
                this.maitre_ouvrage = analyzeData.maitre_ouvrage
                this.maitre_ouvrage_confidence = analyzeData.maitre_ouvrage_confidence
                this.lot = analyzeData.lot
                this.lot_confidence = analyzeData.lot_confidence
                this.sstraitant = analyzeData.sstraitant
                this.sstraitant_confidence = analyzeData.sstraitant_confidence
                this.numdp = analyzeData.numdp
                this.numdp_confidence = analyzeData.numdp_confidence
                this.date_dp = analyzeData.date_dp
                this.date_dp_confidence = analyzeData.date_dp_confidence
                this.appro_actuel_ttc = analyzeData.appro_actuel_ttc
                this.appro_actuel_ttc_confidence = analyzeData.appro_actuel_ttc_confidence
                this.appro_precedent_ttc = analyzeData.appro_precedent_ttc
                this.appro_precedent_ttc_confidence = analyzeData.appro_precedent_ttc_confidence
                this.appro_mensuel_ttc = analyzeData.appro_mensuel_ttc
                this.appro_mensuel_ttc_confidence = analyzeData.appro_mensuel_ttc_confidence
                this.montant_travaux_actuel = analyzeData.montant_travaux_actuel
                this.montant_travaux_actuel_confidence = analyzeData.montant_travaux_actuel_confidence
                this.montant_travaux_precedent = analyzeData.montant_travaux_precedent
                this.montant_travaux_precedent_confidence = analyzeData.montant_travaux_precedent_confidence
                this.montant_travaux_mensuel = analyzeData.montant_travaux_mensuel
                this.montant_travaux_mensuel_confidence = analyzeData.montant_travaux_mensuel_confidence
                this.montant_retenues_actuel = analyzeData.montant_retenues_actuel
                this.montant_retenues_actuel_confidence = analyzeData.montant_retenues_actuel_confidence
                this.montant_retenues_precedent = analyzeData.montant_retenues_precedent
                this.montant_retenues_precedent_confidence = analyzeData.montant_retenues_precedent_confidence
                this.montant_retenues_mensuel = analyzeData.montant_retenues_mensuel
                this.montant_retenues_mensuel_confidence = analyzeData.montant_retenues_mensuel_confidence
                this.montant_libretenues_actuel = analyzeData.montant_libretenues_actuel
                this.montant_libretenues_actuel_confidence = analyzeData.montant_libretenues_actuel_confidence
                this.montant_libretenues_precedent = analyzeData.montant_libretenues_precedent
                this.montant_libretenues_precedent_confidence = analyzeData.montant_libretenues_precedent_confidence
                this.montant_libretenues_mensuel = analyzeData.montant_libretenues_mensuel
                this.montant_libretenues_mensuel_confidence = analyzeData.montant_libretenues_mensuel_confidence
                this.total_ht_actuel = analyzeData.total_ht_actuel
                this.total_ht_actuel_confidence = analyzeData.total_ht_actuel_confidence
                this.total_ht_precedent = analyzeData.total_ht_precedent
                this.total_ht_precedent_confidence = analyzeData.total_ht_precedent_confidence
                this.total_ht_mensuel = analyzeData.total_ht_mensuel
                this.total_ht_mensuel_confidence = analyzeData.total_ht_mensuel_confidence
                this.tva_actuel = analyzeData.tva_actuel
                this.tva_actuel_confidence = analyzeData.tva_actuel_confidence
                this.tva_precedent = analyzeData.tva_precedent
                this.tva_precedent_confidence = analyzeData.tva_precedent_confidence
                this.tva_mensuel = analyzeData.tva_mensuel
                this.tva_mensuel_confidence = analyzeData.tva_mensuel_confidence
                this.montant_du_actuel = analyzeData.montant_du_actuel
                this.montant_du_actuel_confidence = analyzeData.montant_du_actuel_confidence
                this.montant_du_precedent = analyzeData.montant_du_precedent
                this.montant_du_precedent_confidence = analyzeData.montant_du_precedent_confidence
                this.montant_du_mensuel = analyzeData.montant_du_mensuel
                this.montant_du_mensuel_confidence = analyzeData.montant_du_mensuel

                this.analyze_loading = false


            } catch (error) {
                console.error("Error:", error);
            }
        },
        downloadExcel() {

            const jsonData = [
                { 'designation': 'Informations Générales', 'value': '' },
                { 'designation': 'Maitre Ouvrage', 'value': this.maitre_ouvrage },
                { 'designation': 'Lot', 'value': this.lot },
                { 'designation': 'Sous Traitant', 'value': this.sstraitant },
                { 'designation': 'DP Numéro', 'value': this.numdp },
                { 'designation': 'Date DP', 'value': this.date_dp },
                { 'designation': '0-Approvisionnement Matériaux Dhs TTC', 'value': '' },
                { 'designation': 'Actuel', 'value': this.appro_actuel_ttc },
                { 'designation': 'Précédent', 'value': this.appro_precedent_ttc },
                { 'designation': 'Mensuel', 'value': this.appro_mensuel_ttc },
                { 'designation': '0-Approvisionnement Matériaux Dhs TTC', 'value': '' },
                { 'designation': 'Actuel', 'value': this.appro_actuel_ttc },
                { 'designation': 'Précédent', 'value': this.appro_precedent_ttc },
                { 'designation': 'Mensuel', 'value': this.appro_mensuel_ttc },
                { 'designation': '1-Détails des Travaux Réalisés', 'value': '' },
                { 'designation': 'Actuel', 'value': this.montant_travaux_actuel },
                { 'designation': 'Précédent', 'value': this.montant_travaux_precedent },
                { 'designation': 'Mensuel', 'value': this.montant_travaux_mensuel },
                { 'designation': '2-Retenues (Hors Approvisionnement)', 'value': '' },
                { 'designation': 'Actuel', 'value': this.montant_retenues_actuel },
                { 'designation': 'Précédent', 'value': this.montant_retenues_precedent },
                { 'designation': 'Mensuel', 'value': this.montant_retenues_mensuel },
                { 'designation': '3-Libération Retenues', 'value': '' },
                { 'designation': 'Actuel', 'value': this.montant_libretenues_actuel },
                { 'designation': 'Précédent', 'value': this.montant_libretenues_precedent },
                { 'designation': 'Mensuel', 'value': this.montant_libretenues_mensuel },
                { 'designation': '3-Libération Retenues', 'value': '' },
                { 'designation': 'Actuel', 'value': this.montant_libretenues_actuel },
                { 'designation': 'Précédent', 'value': this.montant_libretenues_precedent },
                { 'designation': 'Mensuel', 'value': this.montant_libretenues_mensuel },
                { 'designation': 'TOTAL (1)-(2)+(3)', 'value': '' },
                { 'designation': 'Actuel', 'value': this.total_ht_actuel },
                { 'designation': 'Précédent', 'value': this.total_ht_precedent },
                { 'designation': 'Mensuel', 'value': this.total_ht_mensuel },
                { 'designation': 'TVA 20%', 'value': '' },
                { 'designation': 'Actuel', 'value': this.tva_actuel },
                { 'designation': 'Précédent', 'value': this.tva_precedent },
                { 'designation': 'Mensuel', 'value': this.tva_mensuel },
                { 'designation': 'RESTE DU A L ENTREPRISE TTC - (0)', 'value': '' },
                { 'designation': 'Actuel', 'value': this.montant_du_actuel },
                { 'designation': 'Précédent', 'value': this.montant_du_precedent },
                { 'designation': 'Mensuel', 'value': this.montant_du_mensuel },

            ]
            exportToExcel(jsonData, "MyData.xlsx");
        },
    },
    computed: {
    },
    mounted() {
    },
};
</script>
<style>
.container {
    padding: 0px;
}

.docs {
    width: 100%;
}


/* Table Block Specific */
.table-block table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
}

.table-block th,
.table-block td {
    border: 1px solid #444444;
    /* Matches Prism's subtle line colors */
    padding: 8px 12px;
}

.table-block th {
    background-color: #2d2d2d;
    /* Slightly darker for headers */
    color: #dcdcdc;
    font-weight: bold;
}

.table-block td {
    background-color: #1e1e1e;
    /* Matches Prism Tomorrow background */
    color: #dcdcdc;
}

.table-block tr:nth-child(even) td {
    background-color: #2a2a2a;
    /* Alternate row color */
}
</style>