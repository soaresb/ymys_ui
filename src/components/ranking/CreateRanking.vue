<template>
  <br/>
  <div style="text-align: center; align-items: center; margin: auto;">
      <form class="row g-3">
        <div class="col">
          <label for="year" class="col-form-label">Year</label>
          <div>
          <input v-model="year" type="text" class="form-control" id="year" placeholder="2021">
          </div>
        </div>
        <div class="col">
          <label for="week" class="col-form-label">Week</label>
          <div>
            <input v-model="week" type="text" class="form-control" id="week" placeholder="1">
          </div>
        </div>
        <div>
          <label for="week" class="col-sm-2 col-form-label"></label>
          <div class="col">
            <label for="checkbox">Hidden</label>
            <input type="checkbox" id="checkbox" class="create-ranking-checkbox" v-model="hidden" />
          </div>
        </div>
        <br/>
        <div class="form-group row">
          
        </div>
        <br/>
        <div class="form-group row">
          
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
      html: "",
      hidden: false
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
      if (this.week.length === 0) {
        const toast = useToast();
        toast.error ("Please enter a week.", {
            timeout: 2000,
            icon: false
        });
      } else if (this.year.length === 0) {
        const toast = useToast();
        toast.error ("Please enter a year.", {
            timeout: 2000,
            icon: false
        });
      } else {
        var html = this.$refs.editor.getHTML();
        const data = { body: html, year: this.year, week: this.week, hidden: this.hidden }
        return Promise.all([
            this.$ymysApi.post(
              "/league/power-ranking", 
              data
            )
        ]).then((responses) => {
            const toast = useToast();
            toast.success ("Rankings Saved.", {
                timeout: 2000,
                icon: false
            });
        }).catch((err) => {
            console.log(err);
        })
      }
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
    .create-ranking-checkbox {
      margin-left: 5px;
    }
</style>