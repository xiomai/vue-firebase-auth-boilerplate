<template>
  <div class="row">
    <PageContenHeader pageTitle="Student Page"/>
    <div class="col-sm-12">
      <router-link :to="{ name: 'manage.students'}">
        <button type="button" class="btn btn-seondary ml-2">
          <i class="fas fa-chevron-left"></i>
        </button>
      </router-link>
    </div>
    <div v-if="isStudentLoaded" class="d-flex justify-content-around col-sm-12">
      <div class="col col-md-6 col-sm-12 alert alert-primary m-2">
        <h4 class="text-center">Information</h4>
        <p>
          <strong>ICNO:</strong>
          {{routeICNO}}
        </p>
        <p>
          <strong>Name:</strong>
          {{student.name}}
        </p>
        <p>
          <strong>Course:</strong>
          {{student.course}}
        </p>
      </div>
      <div class="col col-md-6 col-sm-12 alert alert-secondary m-2">
        <h4 class="text-center">Status</h4>
      </div>
    </div>
    <div v-else class="col col-sm-12 p-4">
      <div class="alert alert-warning text-center">
        <h4 class="alert-heading mt-2">Student does not exist.</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { isEmpty } from "lodash";
import { students } from "@/config/firebase";
import PageContenHeader from "@/components/PageContentHeader";

export default {
  name: "Student",
  data() {
    return {
      student: null
    };
  },
  components: {
    PageContenHeader
  },
  computed: {
    routeICNO() {
      return this.$route.params.icno;
    },
    isStudentLoaded() {
      return !isEmpty(this.student);
    }
  },
  async created() {
    try {
      const student = await students.onceGetStudent(this.routeICNO);
      this.student = student.val();
    } catch (error) {
      /* eslint-disable-next-line*/
      console.log(error.code, error.message);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
