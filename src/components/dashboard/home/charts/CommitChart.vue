<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['data', 'styles'],
  mounted () {
      console.log(this.styles)
    this.renderChart(this.data, this.styles)
  }
}
</script>