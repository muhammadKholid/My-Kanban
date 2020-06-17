<template>

    <div class="sub-container">

      <div :class="classObject(category.color)" class="con-title">
        <h2 class="title">{{ category.title }}</h2> 
      </div>

      <div class="con-content">

        <Card
          v-if="filterData.length"
          v-for="item in filterData"
          :item="item"
          @editDone="editDone"
          @remove="remove"
        >
        </Card>

      </div>

    </div>

</template>


<script charset="utf-8">
  import Card from './Card.vue';
  export default{
    name: 'Box',
    props: ['task', 'category'],
    components: {
      Card,
    },
    data(){
      return {

      }
    },
  computed: {
      filterData(){
        let tempFiltered = []
        for (let i = 0; i < this.task.length; i++) {
          if (this.task[i].category == this.category.title){
            tempFiltered.push(this.task[i])
          }
        }
        return tempFiltered
      }
  },
  methods: {
    editDone: function(payload){
      this.$emit('editDone', payload)
    },
    remove(payload){
      this.$emit('remove', payload)
    },
    classObject(bg) {
        let styles = [
          { 'title-1' : true },
          { 'title-2' : true },
          { 'title-3' : true },
          { 'title-4' : true },
        ]
        for(let i = 0; i < styles.length; i++) {
          if (bg == i) {
            return styles[i]
          }
        }
      }
    }
  }
</script>
