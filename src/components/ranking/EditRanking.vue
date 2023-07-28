<template>
  <br/>
  <div style="text-align: center; align-items: center; margin: auto;">
      
  </div>
    
    <br/>
    <div class="editor-container">
        <QuillEditor :modules="modules" theme="snow" toolbar="full" ref="editor"/>
    </div>
    
    <br />
    <button @click="this.submit" type="button" class="btn btn-light ranking-save-button">Save</button>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { ref, defineComponent } from 'vue'
  import BlotFormatter from 'quill-blot-formatter'
  import ImageCompress from 'quill-image-compress';
  import ImageUploader from 'quill-image-uploader';
  import { ymysApi } from "../../api/api";
  import { useRoute } from "vue-router";
  import { useToast } from "vue-toastification";

export default {
  name: 'App',
  // Use Builder's RenderContent to show your Builder content
  // Add NotFoundComponent to use in case of no content
  components: {
    QuillEditor
  },
  setup: () => {
    const modules = [
      {
        name: 'blotFormatter',  
        module: BlotFormatter, 
        options: {/* options */}
      },
      {
        name: 'imageCompress',
        module: ImageCompress, 
        options: {
          quality: 0.8,
          maxWidth: 1000, // default
          maxHeight: 1000, // default
          imageType: 'image/jpeg'
        }
      },
      {
        name: 'imageUploader',
        module: ImageUploader,
        options: {
          upload: file => {
            return new Promise((resolve, reject) => {
              debugger;
              const formData = new FormData();
              formData.append("image", file);
              const x = ymysApi;

              x.post('/league/upload-image', formData)
              .then(res => {
                console.log(res)
                resolve(res.data.results.url);
              })
              .catch(err => {
                reject("Upload failed");
                console.error("Error:", err)
              })
            })
          }
        }
      }
    ]
    return { modules }
  },
  data() {
    return {
      week: "",
      year: "",
      html: ""
    }
  },
  mounted() {
        const route = useRoute();
        this.year = route.params.year;
        this.week = route.params.week;
        return Promise.all([
            this.$ymysApi.get("/league/power-ranking", { params: { week: this.week, year: this.year } })
        ]).then((responses) => {
            const [rankingResponse] = responses;
            this.html = rankingResponse.data.results.body;
            this.$refs.editor.pasteHTML(this.html);
        }).catch((err) => {
            console.log(err);
        })
  },
  methods: {
    scrollToTop() {
        window.scrollTo(0,0);
    },
    submit() {
      var html = this.$refs.editor.getHTML();
      const data = { body: html, year: this.year, week: this.week }
      return Promise.all([
          this.$ymysApi.post(
            "/league/power-ranking", 
            data
          )
      ]).then((responses) => {
            const toast = useToast();
            toast.success("Rankings saved!", {
                timeout: 3000
            });
      }).catch((err) => {
          console.log(err);
      })
    },
    saveText() {
        var html = this.$refs.editor.getHTML();
        this.html = html;
    }
  },
}
</script>

<style>
    .editor-container {
        max-width: 1000px;
        margin: auto;
    }
    .ranking-save-button { 
        margin-bottom: 30px;
    }
</style>