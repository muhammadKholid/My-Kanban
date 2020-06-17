<template>

    <div class="sub-container">

      <div class="con-title title-1">
        <h2 class="title">{{ category }}</h2> 
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
          if (this.task[i].category == this.category){
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
  }
  }
</script>
