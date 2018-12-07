<template>
  <form @submit.prevent="validateBeforeSubmit">
    <fieldset>
      <legend>Add Student Form</legend>
      <div class="form-group">
        <label for="icno">IC Number</label>
        <input
          type="text"
          class="form-control"
          placeholder="IC Number"
          id="icno"
          name="icno"
          v-validate="'required|numeric|length:8'"
          v-model="icno"
        >
      </div>
      <div class="form-group">
        <label for="name">Student Name</label>
        <input
          type="text"
          class="form-control"
          placeholder="Student Name"
          id="name"
          name="name"
          v-validate="'required|alpha_spaces'"
          v-model="name"
        >
      </div>
      <div class="form-group">
        <label for="course">Course</label>
        <input
          type="text"
          id="course"
          name="course"
          class="form-control"
          placeholder="Course"
          v-model="course"
          v-validate="'required|alpha_spaces'"
        >
      </div>
    </fieldset>
    <div class="alert alert-danger error mb-3" v-show="errors.any()">
      <div v-if="errors.has('icno')">{{ errors.first('icno') }}</div>
      <div v-if="errors.has('name')">{{ errors.first('name') }}</div>
      <div v-if="errors.has('course')">{{ errors.first('course') }}</div>
      <div v-if="errors.has('custom_errors')">{{ errors.first('custom_errors') }}</div>
    </div>
    <div class="d-flex justify-content-between col-sm-12">
      <button type="submit" class="btn btn-primary">Add Student</button>
      <button @click="clear" type="button" class="btn btn-primary ml-2">Clear</button>
      <button type="button" class="btn btn-seondary ml-2" @click="hideForm">
        <i class="fas fa-times-circle"></i>
      </button>
    </div>
  </form>
</template>

<script>
import Vue from "vue";
import VeeValidate from "vee-validate";
import spacetime from "spacetime";
import { students } from "@/config/firebase";
import EventBus from "@/config/EventBus";

Vue.use(VeeValidate, {
  events: ""
});

export default {
  name: "AddStudentForm",
  data() {
    return {
      icno: "",
      name: "",
      course: ""
    };
  },
  methods: {
    clear() {
      this.icno = "";
      this.name = "";
      this.course = "";
      this.$validator.reset();
    },
    hideForm() {
      EventBus.$emit("hide-add-student-form");
    },
    async addStudent() {
      try {
        const params = {
          icno: this.icno,
          name: this.name,
          course: this.course,
          added_at: spacetime.now().epoch
        };

        await students.addStudent(params);
        this.clear();
      } catch (error) {
        if (error) {
          this.$validator.errors.add({
            field: "custom_errors",
            msg: "Failed to add Student, IC Number may already exist."
          });
        }
        /* eslint-disable-next-line*/
        console.log(error.message);
      }
    },
    async validateBeforeSubmit() {
      try {
        await this.$validator.reset();
        const response = await this.$validator.validateAll();
        if (response) {
          this.addStudent();
        }
      } catch (error) {
        /* eslint-disable-next-line*/
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>
