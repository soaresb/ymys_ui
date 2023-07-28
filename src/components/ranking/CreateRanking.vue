<template>
  <br/>
  <div style="text-align: center; align-items: center; margin: auto;">
      <form>
        <div class="form-group row">
          <label for="year" class="col-sm-2 col-form-label">Year</label>
          <div class="col-sm-6">
          <input v-model="year" type="text" class="form-control" id="year" placeholder="2021">
          </div>
        </div>
        <br/>
        <div class="form-group row">
          <label for="week" class="col-sm-2 col-form-label">Week</label>
          <div class="col-sm-6">
            <input v-model="week" type="text" class="form-control" id="week" placeholder="1">
          </div>
        </div>
    </form>
  </div>
    
    <br/>
    <div class="editor-container">
        <QuillEditor :modules="modules" theme="snow" toolbar="full" ref="editor"/>
    </div>
    <br />
    <button @click="this.submit" type="button" class="btn btn-light">Save</button>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill'
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import { ref, defineComponent } from 'vue'
  import BlotFormatter from 'quill-blot-formatter'
  import ImageCompress from 'quill-image-compress';
  import ImageUploader from 'quill-image-uploader';
  import { ymysApi } from "../../api/api";

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
  // mounted() lifecycle hook called after component is in the DOM  
  mounted() {
      window.setInterval(() => {
        this.saveText(); // call any function or end point
      }, 10000);
  },
  methods: {
    submit() {
      var html = this.$refs.editor.getHTML();
      const data = { body: html, year: this.year, week: this.week }
      return Promise.all([
          this.$ymysApi.post(
            "/league/power-ranking", 
            data
          )
      ]).then((responses) => {
          return {};
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