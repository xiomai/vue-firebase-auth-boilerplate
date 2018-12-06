<template>
  <div class="row">
    <PageContenHeader pageTitle="Students Page"/>
    <div class="row d-flex justify-content-around col-sm-12">
      <div v-show="viewForm" class="col col-md-4 col-sm-12 mb-2">
        <div class="card border-success">
          <div class="card-body">
            <AddStudentForm/>
          </div>
        </div>
      </div>
      <div v-show="viewForm" class="col col-md-4 col-sm-12 mt-2">
        <div class="card border-secondary">
          <div class="card-header">Recently Added Students</div>
          <div class="card-body p-0">
            <ul class="list-group">
              <li
                :key="student.key"
                v-for="student in recentStudents"
                class="list-group-item d-flex justify-content-between align-items-center mx-0"
              >
                {{student.name}}
                <span class="badge badge-primary badge-pill">IC No: {{student.key}}</span>
              </li>
              <li
                v-if="!recentStudents.length"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <span class="badge badge-warning badge-pill">No Students added yet.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-12 my-5">
      <StudentsTable :viewForm="viewForm"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { students } from "@/config/firebase";
import PageContenHeader from "@/components/PageContentHeader";
import AddStudentForm from "@/components/forms/students/AddStudentForm";
import StudentsTable from "@/components/table/StudentsTable";
import EventBus from "@/config/EventBus";

export default {
  name: "Students",
  components: {
    PageContenHeader,
    AddStudentForm,
    StudentsTable
  },
  data() {
    return {
      viewForm: false
    };
  },
  computed: {
    ...mapGetters(["recentStudents"])
  },
  methods: {
    enableForm() {
      this.viewForm = true;
    },
    disableForm() {
      this.viewForm = false;
    }
  },
  created() {
    students.DBReference.on("value", snapshot => {
      this.$store.dispatch("setStudents", snapshot.val());
    });
  },
  beforeDestroy() {
    students.DBReference.off();
    EventBus.$off(["show-add-student-form", "hide-add-student-form"]);
  },
  mounted() {
    EventBus.$on("show-add-student-form", () => {
      this.enableForm();
    });
    EventBus.$on("hide-add-student-form", () => {
      this.disableForm();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
