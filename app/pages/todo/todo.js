// pages/todo/todo.js
const STORAGE_KEY = 'todoList'

Page({
  data: {
    name: '',
    desc: '',
    todoList: []
  },
  onLoad() {
    this.setData({ todoList: wx.getStorageSync(STORAGE_KEY) || [] })
  },
  onNameInput(e) {
    this.setData({ name: e.detail.value })
  },
  onDescInput(e) {
    this.setData({ desc: e.detail.value })
  },
  addTodo() {
    const name = (this.data.name || '').trim()
    const desc = (this.data.desc || '').trim()
    if (!name) {
      wx.showToast({ title: '请输入事项名称', icon: 'none' })
      return
    }
    const todo = {
      id: Date.now().toString(),
      name,
      desc,
      createTime: Date.now()
    }
    const todoList = [todo].concat(this.data.todoList)
    this.setData({ todoList })
    wx.setStorageSync(STORAGE_KEY, todoList)
    this.setData({ name: '', desc: '' })
    wx.showToast({ title: '添加成功' })
  }
})