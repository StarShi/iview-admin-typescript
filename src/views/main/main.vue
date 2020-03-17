<template>
  <div class="container">
    <!-- 菜单导航 -->
    <Sider
      ref="menuSide"
      hide-trigger
      collapsible
      :collapsed-width="collapsedWidth"
      v-model="isCollapsed"
      :width="showWidth"
      :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto',zIndex:9999}"
      class="menu-side-scoller"
    >
      <div class="admin-title" @click="adminTitleClick">
        <span v-show="!isCollapsed">后台管理</span>
        <!-- <img v-show="isCollapsed" src="@/assets/images/logo.png" alt /> -->
      </div>
      <Menu :theme="theme" accordion width="auto" :class="menuitemClasses" @on-select="menuSelect">
        <Submenu v-for="(item,index) in menuItems" :key="index" :name="item.name">
          <template slot="title">
            <Icon :type="item.icon" />
            <span v-show="!isCollapsed">{{item.name}}</span>
          </template>
          <MenuItem
            v-for="(item_sub,index_sub) in item.subItem"
            :name="item.name +'/'+item.icon+'~'+ item_sub.name+'/'+item_sub.icon"
            :style="menuitemStyle"
            :key="index_sub"
            :to="item_sub.url"
          >
            <Icon v-show="!isCollapsed" :type="item_sub.icon" />
            {{item_sub.name}}
          </MenuItem>
        </Submenu>
      </Menu>
    </Sider>
    <!-- 内容模块 -->
    <Layout
      :style="{marginLeft:(isCollapsed?collapsedWidth:showWidth)+'px'}"
      style="transition:margin-left .2s ease .1s"
    >
    <!-- 头像 -->
      <Header class="layout-header-bar">
        <Icon
          @click.native="collapsedSider"
          class="menu-icon"
          :class="activeIcon"
          type="md-menu"
          size="36"
        ></Icon>
        <Breadcrumb class="cur-menu-path" @click.native="breadcrumbClick">
          <BreadcrumbItem v-for="(item,index) in breadcrumbItems" :key="index" :to="item.url">
            <Icon :type="item.icon" style="margin-right:6px;" />
            {{item.name}}
          </BreadcrumbItem>
        </Breadcrumb>
        <Dropdown class="cur-custom-content">
          <Avatar
            class="user-avatar-dropdown"
            src="https://i.loli.net/2017/08/21/599a521472424.jpg"
          />
          <Icon type="ios-arrow-down user-avatar-dropdown"></Icon>
          <DropdownMenu slot="list">
            <DropdownItem>个人信息</DropdownItem>
            <DropdownItem>注销</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Header>
      <!-- 内容模块 -->
      <Content :style="{padding: '16px'}">
        <Card>
          <router-view></router-view>
        </Card>
      </Content>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class Home extends Vue {
  theme = "dark";
  isCollapsed = false;
  collapsedWidth = 78; //收缩时的宽度
  showWidth = 240; //展开时的宽度
  breadcrumbItems: any = [{ name: "首页", url: "/", icon: "md-home" }]; //头部导航面包屑
  menuItems: any = [
    {
      //左侧导航列表
      name: "内容管理",
      icon: "ios-paper",
      subItem: [
        {
          name: "文章管理",
          icon: "ios-book",
          url: "/content/article"
        },
        {
          name: "作品管理",
          icon: "logo-windows",
          url: "/content/works"
        }
      ]
    },
    {
      name: "模块管理",
      icon: "ios-apps",
      subItem: [
        {
          name: "首页",
          icon: "ios-home",
          url: "/module/home"
        },
        {
          name: "文章",
          icon: "md-book",
          url: "/module/article"
        },
        {
          name: "作品",
          icon: "ios-browsers",
          url: "/module/works"
        },
        {
          name: "联系我",
          icon: "md-chatboxes",
          url: "/module/contact"
        }
      ]
    },
    {
      name: "统计分析",
      icon: "ios-stats",
      subItem: [
        {
          name: "访问分析",
          icon: "ios-link"
        },
        {
          name: "活跃分析",
          icon: "ios-happy-outline"
        },
        {
          name: "时段分析",
          icon: "ios-alarm-outline"
        },
        {
          name: "文章分析",
          icon: "ios-book-outline"
        },
        {
          name: "作品分析",
          icon: "ios-browsers-outline"
        }
      ]
    },
    {
      name: "用户管理",
      icon: "ios-people",
      subItem: [
        {
          name: "用户列表",
          icon: "md-person"
        },
        {
          name: "权限管理",
          icon: "md-settings"
        }
      ]
    },
    {
      name: "站内私信",
      icon: "md-notifications",
      subItem: [
        {
          name: "消息列表",
          icon: "ios-mail"
        }
      ]
    },
    {
      name: "系统管理",
      icon: "md-ionitron",
   
    }
  ];
  get activeIcon() {
    return this.isCollapsed ? "active-icon" : "";
  }
  get menuitemClasses() {
    return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
  }
  get menuitemStyle() {
    return {
      padding: this.isCollapsed ? "12px 20px" : "",
      textAlign: this.isCollapsed ? "center" : "left"
    };
  }
  collapsedSider() {
    //控制左侧导航栏横向的展开与收缩
    console.log(this);
    // this.$refs.menuSide.toggleCollapse();
  }
  menuSelect(name: any) {
    let menuItems = name.split("~");
    let menuName = menuItems[0].split("/")[0];
    let menuIcon = menuItems[0].split("/")[1];
    let subMenuName = menuItems[1].split("/")[0];
    let subMenuIcon = menuItems[1].split("/")[1];
    let item = menuName + "-" + subMenuName;
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
    this.breadcrumbItems.push({
      name: menuName,
      icon: menuIcon
    });
    this.breadcrumbItems.push({
      name: subMenuName,
      icon: subMenuIcon
    });
  }
  breadcrumbClick(ev: any) {
    //点击首页时
    let target = ev.target || ev.srcElement;
    if (target.innerText.indexOf("首页") !== -1) {
      this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
    }
  }
  adminTitleClick(ev: any) {
    let target = ev.target || ev.srcElement;
    this.$router.push({
      name: "AdminHome"
    });
    this.breadcrumbItems = this.breadcrumbItems.slice(0, 1);
  }
}
</script>

<style lang="scss">
@import "./main.scss";
</style>
