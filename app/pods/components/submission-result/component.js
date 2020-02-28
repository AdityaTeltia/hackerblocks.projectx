import Component from '@ember/component';
import { computed } from '@ember/object';

export default class SubmissionResult extends Component {
  didRender() {
    this.element.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  @computed('judgeResult')
  get isRunning() {
    return !this.judgeResult
  }

  @computed('judgeResult')
  get isErrored() {
    return this.judgeResult.result !== 'success'
  }

  @computed('judgeResult')
  get isSubmission() {
    return !!(this.judgeResult.data && this.judgeResult.data.testcases)
  }

  @computed('isErrored')
  get errorPayload() {
    if (this.isErrored) {
      return window.atob(this.judgeResult.error || this.judgeResult.data.output)
    }
  }

  @computed('isSubmission')
  get output() {
    if (!this.isSubmission) {
      return window.atob(this.judgeResult.data.output)
    }
  }

  @computed('isSubmission')
  get testcasesPayload() {
    if (this.isSubmission) {
      return this.judgeResult.data.testcases
    }
  }
}
