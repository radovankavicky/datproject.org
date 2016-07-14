var yo = require('yo-yo')

module.exports = FileQueue

function FileQueue (el) {
  if (!(this instanceof FileQueue)) return new FileQueue(el)
  this.$el = document.getElementById(el)
  this._queue = []
  this._component = this._render()

  if (this.$el) this.$el.appendChild(this._component)
}

FileQueue.prototype.update = function (state) {
  if (state && state.fileQueueReducer) {
    this._queue = state.fileQueueReducer.queue
    console.log('[FileQueue] this._queue', this._queue)

    // set up progress listener on file
    if (this._queue && this._queue.length > 0) {
      this._queue.map(function (file) {
        file.streamProgress.on('progress', function (progress) {
          console.log('ON progress')
          console.log(progress)
        })
      })
    }

    yo.update(this._component, this._render())
  }
}

FileQueue.prototype._render = function () {
  function li (file) {
    return yo`<li>${file.fullPath} (todo: progress bar!)</li>`
  }
  return yo`<ul>
    ${this._queue.map(function (file) {
      return li(file)
    })}
    </ul>`
}
