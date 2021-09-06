<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="index-container">
      <div class="operation">
        <a-menu
          :default-selected-keys="['/VUE']"
          :default-open-keys="['/VUE']"
          mode="inline"
          @click="handleClick"
        >
          <a-menu-item :key="item.path" v-for="item in singleUrls">
            <span>{{ item.name }}</span>
          </a-menu-item>
          <a-sub-menu :key="item.path" v-for="item in urls">
            <span slot="title">
              <!-- <a-icon type="mail" /> -->
              <span>{{ item.name }}</span>
            </span>

            <a-menu-item :key="item1.path" v-for="item1 in item.children">
              <span>{{ item1.name }}</span>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="index-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import myRoutes from "@/router.js";
export default {
  name: "Index",
  data() {
    return {
      title: "",
      urls: [],
      singleUrls: [],
    };
  },
  methods: {
    handleClick(e) {
      let query = {};
      if (e.key === "/VUE") {
        query = { id: 1 };
      }
      this.$router.push({
        path: e.key,
        query,
      });
      this.title = event.target.innerText;
    },
  },

  created() {
    myRoutes.options.routes[0].children.forEach((item) => {
      if (item.children) {
        this.urls.push({
          path: item.path,
          name: item.name,
          children: item.children,
        });
      } else {
        this.singleUrls.push({
          path: item.path,
          name: item.name,
        });
      }
    });

    this.title = this.urls.length > 0 ? this.singleUrls[0].path.substring(1) : "";
  },
};
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  padding: 5px 0px;
  font-weight: bold;
  background: #1890ff;
  color: white;
  margin: 0px;
}

.index-container {
  display: flex;
  .operation {
    width: 200px;
    max-height: calc(100vh - 34px);
    text-align: center;
    border-right: 1px solid #f2f2f2;
  }

  .index-content {
    height: calc(100vh - 34px);
    padding: 10px;
    overflow-y: scroll;
    width: 100%;
  }
}

.ant-btn {
  width: 90px;
  margin-top: 5px;
}

.ant-menu-inline{
  border-right: 0px;
}
</style>

<style>
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-image: linear-gradient(135deg, #09f, #3c9);
}
</style>
