<template>
  <div>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        skipDiacritics: true,
        placeholder: 'Search Students',
      }"
      :pagination-options="{
        enabled: true,
        mode: 'records',
        perPage: 20,
        position: 'top',
        dropdownAllowAll: false,
        rowsPerPageLabel: 'Rows per page',
      }"
    >
      <div slot="table-actions">
        <button
          v-show="!viewForm"
          @click="showAddForm"
          type="button"
          class="btn btn-primary m-2"
        >Add Students Form</button>
      </div>
      <div slot="emptystate">There are no Students record.</div>
      <template slot="table-row" slot-scope="props">
        <span v-if="props.column.field == 'after'">
          <router-link :to="{ name: 'manage.student', params: { icno: props.row.icno } }">
            <button type="button" class="btn btn-seondary ml-2">
              <i class="fas fa-user"></i>
              Show Info
            </button>
          </router-link>
        </span>
        <span v-else>{{props.formattedRow[props.column.field]}}</span>
      </template>
    </vue-good-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { VueGoodTable } from "vue-good-table";
import { map } from "lodash";
import EventBus from "@/config/EventBus";
import "vue-good-table/dist/vue-good-table.css";

export default {
  name: "StudentsTable",
  props: {
    viewForm: {
      type: Boolean,
      default: false
    }
  },
  components: {
    VueGoodTable
  },
  data() {
    return {
      columns: [
        {
          label: "IC No",
          field: "icno",
          type: "number",
          sortable: false,
          width: "10rem"
        },
        {
          label: "Name",
          field: "name",
          sortable: false
        },
        {
          label: "Course",
          field: "course",
          sortable: false
        },
        {
          label: "Actions",
          field: "after"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["students"]),
    rows() {
      const { students } = this;
      const mappedStudentsIntoRowsDataset = map(students, (student, key) => ({
        icno: key,
        name: student.name,
        course: student.course
      }));

      return mappedStudentsIntoRowsDataset;
    }
  },
  methods: {
    showAddForm() {
      EventBus.$emit("show-add-student-form");
    }
  }
};
</script>
