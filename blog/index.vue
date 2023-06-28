<template>
    <div :class="[{ 'full-screen': showFull }]" class="page detail-page detail-material">
        <detail-header></detail-header>
        <div class="cont container">
            <!-- 面包屑 -->
            <!-- :class="hoverClass" -->
            <p class="crumbs-box">
                当前位置：
                <nuxt-link to="/">首页</nuxt-link>
                <nuxt-link :to="{ name: 'portal-educTypeId', params: { educTypeId: pageData.educTypeId } }">
                    {{ pageData.educTypeId | filterEduType }}
                </nuxt-link>
                <nuxt-link
                    :to="{
                        path: '/search',
                        query: { educTypeId: pageData.educTypeId, moduleClassify: 'CASE' }
                    }"
                >
                    案例智库
                </nuxt-link>
                <a @click="setMaterial">{{ pageData.projectDefineName }}</a>
                <a @click="setMaterialList">材料列表</a>
                <a href="javascript:">材料内容</a>
            </p>
            <!-- {{ pageData.id }} -->
            <div v-if="!isDelete" class="contMain clearfix">
                <!-- 主要内容 -->
                <div class="contMain-left">
                    <h2 class="article-title">{{ pageData.materialName }}</h2>
                    <div class="source clearfix">
                        <div class="source-left">
                            <a :title="pageData.majors" class="more-majors" href="javascript:">
                                {{ pageData.majors }}
                            </a>
                            <a class="more-majors" href="javascript:">{{ pageData.year }}年</a>
                            <a class="more-majors" href="javascript:">{{ pageData.projectDefineName }}</a>
                            <a class="more-majors" href="javascript:">{{ level }}</a>
                            <a class="more-majors" href="javascript:">{{ pageData.materialTypeName }}</a>
                        </div>
                        <div class="source-right">
                            <a class="eye" href="javascript:">
                                <i class="ico"></i>
                                <span>{{ pageData.browseCount }}</span>
                            </a>
                            <span class="share-box">
                                <comShare v-if="showShare" :config="shareConfig">
                                    <a class="share" href="javascript:">
                                        <span class="transmit_img"></span>
                                        <span class="transmit">转发</span>
                                    </a>
                                </comShare>
                                <a
                                    v-if="pageData.isCollection"
                                    class="collect2"
                                    href="javascript:"
                                    title="取消收藏"
                                    @click="setCollect(false)"
                                >
                                    <span class="already_collect_img"></span>
                                    <span class="already_collect_box">
                                        <span>已收藏</span>
                                        取消收藏
                                    </span>
                                </a>
                                <a v-else class="collect" href="javascript:" @click="setCollect(true)">
                                    <i class="ico2"></i>
                                    <span>收藏</span>
                                </a>
                            </span>
                        </div>
                    </div>

                    <!-- 正文 -->
                    <!-- 视频材料 -->
                    <div v-if="pageData.materialVideoTypeCode === 'video'" class="article-main">
                        <div class="article-content article-video">
                            <video ref="video" :src="videoUrl" controls controlslist="nodownload"></video>
                        </div>

                        <!-- 文档底部 -->
                        <div
                            v-if="JSON.stringify(pageData) !== '{}' && pageData.isBuy !== 1"
                            :class="!isLogin ? '' : 'material-foot'"
                            class="article-foot"
                        >
                            <div class="foot-text">
                                <!-- 未登录 -->
                                <template v-if="!isLogin">
                                    <client-only>
                                        <p>
                                            如需观看完整视频，请
                                            <span class="text" style="cursor: pointer" @click="loginDetect()"
                                                >登录</span
                                            >
                                        </p>
                                    </client-only>
                                </template>

                                <!-- 未购买 -->
                                <template v-else>
                                    <client-only>
                                        <div v-if="pageData.shareType !== 0" class="buy-rest">
                                            <template v-if="pageData.shareType === 1">
                                                <!-- 积分不足 -->
                                                <template v-if="userScore < pageData.materialScoreNumber">
                                                    <div class="left">
                                                        <img src="~/assets/images/detail-integral.png" />
                                                    </div>
                                                    <div class="right">
                                                        <div class="tip">
                                                            <span>
                                                                支付
                                                                <span style="color: #ff5722">{{
                                                                    pageData.materialScoreNumber
                                                                }}</span>
                                                                积分查看完整内容
                                                            </span>
                                                        </div>
                                                        <div class="explain">
                                                            <span>积分不足，账户剩余</span>
                                                            <span style="color: #ff5722">{{ userScore }}</span>
                                                        </div>

                                                        <!-- 需要上传案例 -->
                                                        <!--                                                        <template>-->
                                                        <!--                                                            <div class="button">-->
                                                        <!--                                                                <button @click="handleUploadCase">-->
                                                        <!--                                                                    上传案例赚积分-->
                                                        <!--                                                                </button>-->
                                                        <!--                                                                <span class="obtain">-->
                                                        <!--                                                                    <a-->
                                                        <!--                                                                        href="https://www.mentorsc.com/questionClassify?type=detail&id=20"-->
                                                        <!--                                                                        target="_blank"-->
                                                        <!--                                                                        >获得更多积分</a-->
                                                        <!--                                                                    >-->
                                                        <!--                                                                </span>-->
                                                        <!--                                                            </div>-->
                                                        <!--                                                        </template>-->

                                                        <template>
                                                            <div class="button">
                                                                <button @click="onBuy">兑换积分获取</button>
                                                                <span class="obtain" @click="handleUploadCase">
                                                                    上传案例赚积分
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>

                                                <!-- 积分足够 -->
                                                <template v-else>
                                                    <div class="left">
                                                        <img src="~/assets/images/detail-integral.png" />
                                                    </div>
                                                    <div class="right">
                                                        <div class="tip">
                                                            <span>
                                                                支付
                                                                <span style="color: #ff5722">{{
                                                                    pageData.materialScoreNumber
                                                                }}</span>
                                                                积分查看完整内容
                                                            </span>
                                                        </div>
                                                        <div class="explain">
                                                            <span>账户共</span>
                                                            <span style="color: #ff5722">{{ userScore }}</span>
                                                            <span>积分</span>
                                                        </div>

                                                        <!-- 确认支付 -->
                                                        <template>
                                                            <div class="button">
                                                                <button style="width: 120px" @click="onBuy">
                                                                    确认支付
                                                                </button>
                                                                <span class="morepoints">
                                                                    <a
                                                                        href="https://www.mentorsc.com/questionClassify?type=detail&id=20"
                                                                        target="_blank"
                                                                        >获得更多积分</a
                                                                    >
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>
                                            </template>
                                            <template v-if="pageData.shareType === 2">
                                                <!-- 金额购买 -->

                                                <div class="left">
                                                    <img src="~/assets/images/detail-integral.png" />
                                                </div>
                                                <div class="right">
                                                    <div class="tip">
                                                        <span>
                                                            支付
                                                            <span style="color: #ff5722"
                                                                >￥ {{ pageData.materialPrice.toFixed(2) }}</span
                                                            >
                                                            获取全文
                                                        </span>
                                                    </div>

                                                    <!-- 确认支付 -->
                                                    <template>
                                                        <div class="button">
                                                            <button style="width: 120px" @click="onBuy">
                                                                确认支付
                                                            </button>
                                                        </div>
                                                    </template>
                                                </div>
                                            </template>
                                        </div>
                                    </client-only>
                                </template>
                            </div>

                            <!-- 文章底部收藏与转发 -->
                            <div class="foot-share">
                                <a
                                    v-if="pageData.isCollection"
                                    class="collect collect2"
                                    href="javascript:"
                                    title="取消收藏"
                                    @click="setCollect(false)"
                                >
                                    <i class="ico"></i>
                                    <span class="text">已收藏</span>
                                </a>
                                <a v-else class="collect" href="javascript:" title="收藏" @click="setCollect(true)">
                                    <i class="ico"></i>
                                    <span class="text">收藏</span>
                                </a>
                                <p class="share">
                                    转发到：
                                    <comShare v-if="showShare" :config="shareConfig" :is-popover="false"></comShare>
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- 文档材料 -->
                    <div v-else>
                        <div :class="[{ 'full-screen': showFull }]" class="article-main">
                            <div v-if="pageData.isBuy === 1" class="article-pull-screen" @click="showFull = !showFull">
                                <img src="~/assets/images/all.png" />
                            </div>
                            <div v-if="fileJPGs && fileJPGs.length" class="article-content">
                                <client-only>
                                    <div v-for="item in fileJPGs" :key="item.webUrl" class="article-item">
                                        <img :key="item.webUrl" v-lazy="item.webUrl" />
                                    </div>
                                </client-only>
                            </div>
                        </div>

                        <!-- 文档底部 -->
                        <div
                            v-if="JSON.stringify(pageData) !== '{}' && pageData.isBuy !== 1"
                            :class="!isLogin ? '' : 'material-foot'"
                            class="article-foot"
                        >
                            <div class="foot-text">
                                <!-- 未登录 -->
                                <template v-if="!isLogin">
                                    <client-only>
                                        <p v-if="fileJPGs">
                                            还剩
                                            <span style="color: #c73741">{{ surplusPageNum }}</span>
                                            页未阅读，如需继续浏览，请
                                            <span class="text" style="cursor: pointer" @click="loginDetect()">
                                                登录
                                            </span>
                                        </p>
                                        <p v-else>已经阅读到文档的结尾了</p>
                                    </client-only>
                                </template>

                                <!-- 未购买 -->
                                <template v-else>
                                    <client-only>
                                        <div v-if="pageData.shareType !== 0" class="buy-rest">
                                            <template v-if="pageData.shareType === 1">
                                                <!-- 积分不足 -->
                                                <template v-if="userScore < pageData.materialScoreNumber">
                                                    <div class="left">
                                                        <img src="~/assets/images/detail-integral.png" />
                                                    </div>
                                                    <div class="right">
                                                        <div class="tip">
                                                            <span>
                                                                支付
                                                                <span style="color: #ff5722">{{
                                                                    pageData.materialScoreNumber
                                                                }}</span>
                                                                积分查看完整内容
                                                            </span>
                                                        </div>
                                                        <div class="explain">
                                                            还剩下
                                                            <span style="color: #c73741">{{ surplusPageNum }}</span>
                                                            <span>页未阅读，积分不足，账户剩余</span>
                                                            <span style="color: #ff5722">{{ userScore }}</span>
                                                        </div>

                                                        <!-- 需要上传案例 -->
                                                        <!--                                                        <template>-->
                                                        <!--                                                            <div class="button">-->
                                                        <!--                                                                <button @click="handleUploadCase">-->
                                                        <!--                                                                    上传案例赚积分-->
                                                        <!--                                                                </button>-->
                                                        <!--                                                                <span class="obtain">-->
                                                        <!--                                                                    <a-->
                                                        <!--                                                                        href="https://www.mentorsc.com/questionClassify?type=detail&id=20"-->
                                                        <!--                                                                        target="_blank"-->
                                                        <!--                                                                        >兑换积分获取</a-->
                                                        <!--                                                                    >-->
                                                        <!--                                                                </span>-->
                                                        <!--                                                            </div>-->
                                                        <!--                                                        </template>-->

                                                        <template>
                                                            <div class="button">
                                                                <button @click="onBuy">兑换积分获取</button>
                                                                <span class="obtain" @click="handleUploadCase">
                                                                    上传案例赚积分
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>

                                                <!-- 积分足够 -->
                                                <template v-else>
                                                    <div class="left">
                                                        <img src="~/assets/images/detail-integral.png" />
                                                    </div>
                                                    <div class="right">
                                                        <div class="tip">
                                                            <span>
                                                                支付
                                                                <span style="color: #ff5722">{{
                                                                    pageData.materialScoreNumber
                                                                }}</span>
                                                                积分查看完整内容
                                                            </span>
                                                        </div>
                                                        <div class="explain">
                                                            <span>账户共</span>
                                                            <span style="color: #ff5722">{{ userScore }}</span>
                                                            <span>积分</span>
                                                        </div>

                                                        <!-- 确认支付 -->
                                                        <template>
                                                            <div class="button">
                                                                <button style="width: 120px" @click="onBuy">
                                                                    确认支付
                                                                </button>
                                                                <span class="morepoints">
                                                                    <a
                                                                        href="https://www.mentorsc.com/questionClassify?type=detail&id=20"
                                                                        target="_blank"
                                                                        >获得更多积分</a
                                                                    >
                                                                </span>
                                                            </div>
                                                        </template>
                                                    </div>
                                                </template>
                                            </template>

                                            <template v-if="pageData.shareType === 2">
                                                <div class="left">
                                                    <img src="~/assets/images/detail-integral.png" />
                                                </div>
                                                <div class="right">
                                                    <div class="tip">
                                                        <span>
                                                            支付
                                                            <span style="color: #ff5722"
                                                                >￥ {{ pageData.materialPrice.toFixed(2) }}</span
                                                            >
                                                            获取全文
                                                        </span>
                                                    </div>

                                                    <!-- 确认支付 -->
                                                    <template>
                                                        <div class="button">
                                                            <button style="width: 120px" @click="onBuy">
                                                                确认支付
                                                            </button>
                                                        </div>
                                                    </template>
                                                </div>
                                            </template>
                                        </div>
                                    </client-only>
                                </template>
                            </div>

                            <!-- 文章底部收藏与转发 -->
                            <div class="foot-share">
                                <a
                                    v-if="pageData.isCollection"
                                    class="collect collect2"
                                    href="javascript:"
                                    title="取消收藏"
                                    @click="setCollect(false)"
                                >
                                    <i class="ico"></i>
                                    <span class="text">已收藏</span>
                                </a>
                                <a v-else class="collect" href="javascript:" title="收藏" @click="setCollect(true)">
                                    <i class="ico"></i>
                                    <span class="text">收藏</span>
                                </a>
                                <p class="share">
                                    转发到：
                                    <share v-if="showShare" :config="shareConfig"></share>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 右侧栏 -->
                <div class="contMain-right">
                    <template>
                        <!-- 案例下架 -->
                        <div v-if="pageData.status === 1" class="shelves">案例已下架</div>

                        <template v-else>
                            <ForCaseBtn
                                v-if="pageData.isBuy === 0"
                                :page-data="pageData"
                                :is-material="true"
                                @onPay="onBuy"
                            ></ForCaseBtn>

                            <!-- 已认领 -->
                            <div
                                v-if="pageData.caseUserLeader && pageData.caseId"
                                class="claimed clearfix"
                                @click="$router.push('caseperson?caseUserId=' + pageData.caseUserLeader.userId)"
                            >
                                <div class="claimed-img">
                                    <div class="img">
                                        <img
                                            :src="pageData.caseUserLeader.userAvatar | thumbnail('500x500', 'avatar')"
                                            alt
                                        />
                                    </div>
                                </div>
                                <div class="claimed-info">
                                    <a>
                                        <div class="person">
                                            <div class="user-name">
                                                {{ pageData.caseUserLeader.userNickname }}
                                            </div>
                                            <i class="ico" style="opacity: 0"></i>
                                        </div>
                                        <p class="dec">{{ caseUserInfo }}</p>
                                    </a>
                                </div>
                            </div>

                            <div v-if="pageData.caseId && !pageData.caseUserLeader" class="btn-home btn-home-claim">
                                <a @click="toCaseClaim">
                                    <i style="padding-top: 9px">认领此案例</i>
                                    <i>
                                        <!--                                                                            （认领即获得-->
                                        <!--                                                                            <span>{{ gainIntegral }}</span>-->
                                        <!--                                                                            积分 ）-->
                                    </i>
                                </a>
                            </div>
                        </template>

                        <!-- 积分模块-->
                        <!-- <div class="integral">
                            <template v-if="pageData.isPayScore === 1">
                                <div v-if="pageData.isBuy === 1" class="obtain">
                                    <div class="msg">
                                        已获取，剩余积分：
                                        <i>{{ userScore }}</i>
                                    </div>
                                </div>
                            </template>

                            <div class="link-list">
                                <a href="javascript:" @click="onShowInvitation">邀请注册获取积分</a>
                                <a href="javascript:" @click="handleUploadCase">上传案例获取积分</a>
                                <a href="https://mentorsc.com/questionClassify?type=detail&id=20">分享转发获取积分</a>
                                <a href="javascript:" @click="openWxOfficial = true">关注公众号获取积分</a>
                                <a href="https://mentorsc.com/questionClassify?type=detail&id=20">
                                    更多获取方式
                                    <i class="el-icon-arrow-right"></i>
                                </a>
                            </div>
                        </div>
                        <el-dialog
                            :close-on-click-modal="false"
                            :visible.sync="openWxOfficial"
                            class="qr-code"
                            height="400px"
                            width="400px"
                        >
                            <div class="qr-code-main">
                                <img alt="" src="@/assets/community-images/qr-code.png" />
                                <p>
                                    关注公众号即可获得
                                    <i>3200</i>
                                    积分
                                </p>
                            </div>
                        </el-dialog> -->

                        <!-- 该案例 材料 -->
                        <div v-if="pageData.caseId" class="case-material clearfix">
                            <div class="hd" @click="goCasePage({ id: pageData.caseId })">
                                <div class="tit">该案例材料</div>
                                <a class="hd-more">
                                    <i class="more"></i>
                                </a>
                            </div>
                            <div class="list">
                                <a
                                    v-for="(item, index) in caseMaterialList.list"
                                    :key="index"
                                    :class="{
                                        'case-material-active': index === caseMaterialActive
                                    }"
                                    @click="handleCaseMaterial(item, index)"
                                >
                                    <i class="circle"></i>
                                    {{ item.materialName }}
                                </a>
                            </div>
                            <div
                                v-if="caseMaterialList.isMore"
                                class="query-whole"
                                @click="goCasePage({ id: pageData.caseId })"
                            >
                                查看全部材料
                            </div>
                        </div>

                        <!-- 快速导航 -->
                        <div v-if="pageData.relevanceProjectPlanName || pageData.relevanceNarrateName" class="item">
                            <h4 class="aside-h4">
                                <a href="javascript:">快速导航</a>
                            </h4>
                            <ul class="btn-ul">
                                <li v-if="pageData.relevanceProjectPlanName">
                                    <a
                                        :title="pageData.relevanceProjectPlanName"
                                        @click="
                                            toProject({
                                                id: pageData.relevanceProjectPlanId
                                            })
                                        "
                                    >
                                        {{ pageData.relevanceProjectPlanName }} 项目指南
                                    </a>
                                </li>
                                <li v-if="pageData.relevanceNarrateName">
                                    <a :title="pageData.relevanceNarrateName" @click="toNarrate(pageData)">
                                        {{ pageData.relevanceNarrateName }}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </template>

                    <!-- 相似材料 -->
                    <div v-if="aboutData && aboutData.length" class="item material">
                        <h4 class="aside-h4">
                            <a href="javascript:">相似材料</a>
                            <more-icon class="more" @click.native="setMaterial()"></more-icon>
                        </h4>
                        <ul class="list">
                            <li v-for="(item, index) in aboutData" :key="index" class="clearfix">
                                <a class="dd" href="javascript:" @click="toMaterial(item)">{{ item.materialName }}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- 常见问题 -->
                    <div v-if="questionData && questionData.length" class="item question">
                        <h4 class="aside-h4">
                            <a href="javascript:">常见问题</a>
                            <more-icon class="more" @click.native="$router.push('/question')"></more-icon>
                        </h4>
                        <ul class="list">
                            <li v-for="(item, index) in questionData" :key="index" class="clearfix">
                                <a class="dd" href="javascript:" @click="toQuestion(item.id)">{{ item.question }}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- 广告A -->
                    <template v-if="advertisementListA && advertisementListA.length">
                        <div v-for="item in advertisementListA" :key="item.id" class="ad">
                            <a :href="item.bannerUrl" target="_blank">
                                <img :src="item.bannerFile" alt />
                            </a>
                        </div>
                    </template>
                    <!-- 浏览历史 -->
                    <div v-if="historyData && historyData.length" class="item history">
                        <h4 class="aside-h4">
                            <a href="javascript:">浏览历史</a>
                        </h4>
                        <ul class="list">
                            <li
                                v-for="(item, index) in historyData"
                                :key="index"
                                class="clearfix"
                                @click="toMaterial({ id: item.targetId })"
                            >
                                <a class="dd" href="javascript:">{{ item.targetName }}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- 下一篇 -->
                    <div v-if="false" class="item next">
                        <h4 class="aside-h4">
                            <a href="javascript:">下一篇</a>
                        </h4>
                        <ul class="list">
                            <li v-for="(item, index) in 1" :key="index" class="clearfix">
                                <a class="dd" href="javascript:" @click="toMaterial(item)">item.title}}</a>
                            </li>
                        </ul>
                    </div>
                    <!-- 广告2 -->
                    <div class="ad ad2">
                        <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=524337559&site=qq&menu=yes">
                            <img src="@/assets/images/advert_aside2.png" alt />
                        </a>
                    </div>
                    <template v-if="advertisementListB && advertisementListB.length">
                        <div v-for="item in advertisementListB" :key="item.id" class="ad ad2">
                            <a :href="item.bannerUrl" target="_blank">
                                <img :src="item.bannerFile" alt />
                            </a>
                        </div>
                    </template>

                    <div class="exemption">
                        <img alt="" src="~/assets/images/exemption.png" />
                        <a href="/login/exemption" target="_blank">免责申明</a>
                    </div>
                </div>
            </div>

            <!-- 缺省页 -->
            <div v-else class="default-page">
                <img class="default-page-img" src="~/assets/images/deleted.png" />
                <div class="default-page-text">文章已被作者删除</div>
            </div>
        </div>

        <Footer></Footer>

        <InviteBounced
            v-if="isShowInvitation"
            @onShowInvitation="onShowInvitation"
            @onShowCopy="onShowCopy"
        ></InviteBounced>

        <CopySuccess v-if="isShowCopySuccess"></CopySuccess>

        <!--        <PayBounced-->
        <!--            v-if="mixins_pc_money_pay_dialog"-->
        <!--            :pay-type="payType"-->
        <!--            :material-item="materialItem"-->
        <!--            :page-data="pageData"-->
        <!--            @onShowPay="onShowPay"-->
        <!--            @ok="handlePaySuccess"-->
        <!--        ></PayBounced>-->

        <!-- TODO 支付弹窗  -->
        <PayBounced
            v-if="mixins_pc_money_pay_dialog"
            :coupon-object="mixins_rules_coupon_object"
            :is-warning="mixin_pc_integral_isWarning"
            :material-item="materialItem"
            :min-object="minObject"
            :mixins-rules-integral="Number(mixins_rules_integral)"
            :page-data="pageData"
            :pay-type="payType"
            :score-num="Number(projectIntegral)"
            :integral-object="mixin_pc_integral_Object"
            @ok="handlePaySuccess"
            @onShowPay="onShowPay"
            @back="onShowBack"
        ></PayBounced>

        <!--  金额购买  -->
        <el-dialog
            :before-close="handleMixinsRulesShowDialog"
            :visible.sync="mixins_pc_money_dialog"
            title=""
            width="568px"
        >
            <div class="dialog-box">
                <div class="title">
                    获取{{ payType === 'case' ? '案例' : '材料' }}需支付<span
                        ><span style="padding-right: 2px">￥</span>{{ Number(mixins_rules_price_amount).toFixed(2) }}
                    </span>
                </div>
                <div class="coupon-select">
                    <span>使用优惠券：</span>
                    <el-select
                        v-model="mixins_rules_coupon_val"
                        :disabled="mixins_rules_coupon_options.length === 0"
                        clearable
                        placeholder="请选择优惠券"
                        value-key="id"
                        @change="mixins_rules_handleCouponChange"
                    >
                        <el-option
                            v-for="item in mixins_rules_coupon_options"
                            :key="item.value"
                            :label="item.couponName"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="integral-input">
                    <span class="integral-box">使用积分：</span>
                    <div class="input-box">
                        <el-input-number
                            v-model="mixins_rules_integral"
                            :disabled="integralDisabled"
                            :max="mixins_rules_max_integral"
                            :step="1000"
                            class="my-input-number"
                            label="描述文字"
                            size="medium"
                            step-strictly
                            @blur="mixins_rules_handleBlurChange"
                            @change="handleChangeIntegral"
                        ></el-input-number>

                        <div class="msg-box">
                            账户共 {{ mixins_rules_variety_count }} 积分，本次抵扣
                            <span>¥{{ Number(mixins_rules_price).toFixed(2) }} </span>
                        </div>
                    </div>
                </div>
                <div>
                    <span v-show="mixins_rules_isWarning" class="point">
                        <i class="point-icon"></i>
                        超额支付：抵扣金额（¥{{ Number(mixins_rules_actual_discount_price).toFixed(2) }}）＞ 支付（ ¥{{
                            Number(mixins_rules_actual_amount).toFixed(2)
                        }}）
                    </span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleMixinsRulesShowDialog">取 消</el-button>
                <el-button
                    v-loading="mixins_rules_loading"
                    :disabled="mixins_rules_loading"
                    type="primary"
                    @click="handleMoneyMixinsClickCertain"
                    >确 定</el-button
                >
            </span>
        </el-dialog>

        <!--  积分购买  -->
        <el-dialog
            :before-close="handleMoneyMixinsClickIntegralDialog"
            :visible.sync="mixins_pc_integral_dialog"
            title=""
            width="568px"
        >
            <div class="dialog-box">
                <div class="title">
                    获取{{ payType === 'case' ? '案例' : '材料' }}需支付积分<span>{{
                        mixins_pc_integral_scoreNumber
                    }}</span>
                </div>
                <div class="integral-input">
                    <span class="integral-box">使用积分：</span>
                    <div class="input-box">
                        <el-input-number
                            v-model="mixins_rules_integral"
                            :max="
                                mixins_rules_count > mixins_pc_integral_scoreNumber
                                    ? mixins_pc_integral_scoreNumber
                                    : Number(1000 * parseInt(`${mixins_rules_count / 1000}`))
                            "
                            :min="0"
                            :step="1000"
                            class="my-input-number"
                            label="描述文字"
                            size="medium"
                            :step-strictly="false"
                            @change="handleChangeIntegralMixins"
                        ></el-input-number>

                        <div class="msg-box">账户共 {{ mixins_rules_variety_count }} 积分</div>
                    </div>
                </div>
                <div>
                    <span v-show="mixin_pc_integral_isWarning" class="point">
                        <i class="point-icon"></i>
                        使用积分不足{{ mixins_pc_integral_scoreNumber }}，需支付 ¥{{ moneyProjectIntegral }} 兑换
                        {{ projectIntegral }} 积分
                    </span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="handleMixinsRulesShowDialog">取 消</el-button>
                <el-button
                    v-loading="mixins_rules_loading"
                    :disabled="mixins_rules_loading"
                    type="primary"
                    @click="handleIntegralMixinsClickConfirm"
                    >立即兑换</el-button
                >
            </span>
        </el-dialog>
    </div>
</template>

<script>
import detail from '@/mixins/detail.js';
import InviteBounced from '@/components/InviteBounced/InviteBounced';
import CopySuccess from '@/components/InviteBounced/CopySuccess';
import comShare from '@/components/common/com-share';
import ForCaseBtn from '@/components/ForCaseBtn';
import PayBounced from '@/components/PayBounced/PayBounced';
import { mapGetters } from 'vuex';
import mixinsPromotionRules from '@/mixins/mixinsPromotionRules';
export default {
    name: 'DetailMaterial',
    components: { comShare, InviteBounced, CopySuccess, ForCaseBtn, PayBounced },
    filters: {
        filterEduType(type) {
            const EDU_TYPE = {
                1: '高职',
                2: '本科'
            };
            return EDU_TYPE[type] || null;
        }
    },
    mixins: [detail, mixinsPromotionRules],
    async asyncData({ app, query }) {
        const materialPromise = await app.$apis.project.getMaterialInfo({
            id: query.id,
            buy: 0
        });
        let isDelete = materialPromise.data.isDelete === 1;
        if (!isDelete) {
            let pageData = materialPromise.code === 1 ? materialPromise.data.source : {};
            console.log(pageData);
            return {
                pageData,
                isDelete
            };
        }

        return {
            isDelete
        };
    },
    data() {
        return {
            pageType: 'MATERIAL',
            showFull: false, // 全屏显示
            isClaimed: false, // 是否被认领
            isCollect: false, // 是否被收藏

            pageData: {}, // 页面数据
            aboutData: [], // 相似材料
            historyData: [], // 浏览历史
            // 分享配置
            showShare: false,
            shareConfig: {
                title: '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
                description: '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
                sites: ['wechat', 'weibo', 'qq', 'qzone'], // 启用的站点
                wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
                wechatQrcodeHelper: '<p>扫一扫</p><p>二维码便可将本文分享至朋友圈。</p>'
            },

            // 广告
            advertisementListA: [],
            advertisementListB: [],

            // 用户积分
            userScore: 0,
            dialogVisible: false,

            // 案例材料选中索引
            caseMaterialActive: -1,
            // 案例材料列表
            caseMaterialArr: [],
            openWxOfficial: false,

            //邀请弹框
            isShowInvitation: false,
            //显示复制成功弹框
            isShowCopySuccess: false,

            isShowPay: false,
            payType: '',
            materialItem: {},

            //文章是否被删除
            isDelete: false,
            // 图片数组
            fileJPGs: []
        };
    },
    computed: {
        ...mapGetters(['userInfo', 'isLogin', 'city', 'teacherInfo']),

        integralD() {
            //用户积分
            const mixins_rules_count = this.mixins_rules_count;
            //价格积分
            return mixins_rules_count < this.mixins_pc_integral_scoreNumber;
        },

        integralDisabled() {
            const mixins_rules_count = this.mixins_rules_count;
            const mixins_rules_max_integral = this.mixins_rules_max_integral;

            return (
                this.mixins_rules_coupon_certificate ||
                mixins_rules_count < 1000 ||
                mixins_rules_max_integral === 0 ||
                this.mixins_rules_coupon_type_code === 'template_coin_certificate'
            );
        },

        // 金额
        moneyProjectIntegral() {
            // 商品需要总积分
            const pay = Math.ceil(this.mixins_pc_integral_scoreNumber / 1000) * 1000;

            return ((pay - this.mixins_rules_integral) / 400).toFixed(2);
        },
        projectIntegral() {
            const pay = Math.ceil(this.mixins_pc_integral_scoreNumber / 1000) * 1000;
            return pay - this.mixins_rules_integral;
        },

        level() {
            const START = {
                0: this.pageData?.province, //省级
                1: '全国', //全国
                2: this.pageData?.cityName, //市级
                3: this.pageData?.countyName //区级
            };

            return START[this.pageData.level];
        },

        caseUserInfo() {
            let caseUserInfo = [];
            if (this.pageData.caseUserLeader) {
                if (this.pageData.caseUserLeader.schoolName) caseUserInfo.push(this.pageData.caseUserLeader.schoolName);
                if (this.pageData.caseUserLeader.professionTypeName)
                    caseUserInfo.push(this.pageData.caseUserLeader.professionTypeName);
            }
            if (caseUserInfo.length === 0) return '暂无简介';
            return caseUserInfo.join('，');
        },

        // 视频地址
        videoUrl() {
            this.$nextTick(() => {
                if (this.$refs.video) {
                    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                    this.$refs.video.disablePictureInPicture = true;
                }
            });
            return this.pageData.videoUrl || this.pageData.materialFileInfo.fileUrl;
        },

        // 剩余未读页数
        surplusPageNum() {
            const fileJPGs = this.fileJPGs;
            const result = fileJPGs && fileJPGs.length;
            return result ? fileJPGs[0].totalPageNum : 0;
        },

        // 案例材料列表
        caseMaterialList() {
            const { caseMaterialArr: list } = this;
            const isMore = list.length > 5;
            return {
                isMore,
                list: isMore ? list.slice(0, 5) : list
            };
        },

        // 根据项目级别获取对应赚取的积分
        // 省级600 国家级800
        gainIntegral() {
            return this.pageData.level === 0 ? '600' : '800';
        },

        hoverClass() {
            const educTypeId = Number(this.pageData.educTypeId);
            return educTypeId === 1 ? 'v-hight' : 'hight';
        }
    },
    watch: {
        $route(to, from) {
            if (to.query.id !== from.query.id) {
                this.getMaterialInfo(to.query.id, 0);
            }
        }
    },
    mounted() {
        const { id } = this.$route.query;
        this.id = id;
        if (!id) return;
        this.getMaterialInfo(id, 0);
        this.getAdvertisementList();
    },
    methods: {
        async onShowBack() {
            this.mixins_pc_integral_dialog = this.pageData.shareType === 1;
            this.mixins_pc_money_dialog = this.pageData.shareType === 2;
            this.mixins_pc_money_pay_dialog = false;
        },
        async handleOpen() {
            const { userAccount, userNickname } = this.userInfo;
            const { createById, id, casePrice } = this.pageData;

            let params = {
                caseId: id,
                materialId: this.payType === 'case' ? -1 : this.materialItem?.id,
                authorId:
                    this.pageData?.leaderUserId ||
                    this.pageData?.leaderId ||
                    this.pageData?.caseUserLeader?.userId ||
                    createById,
                //正式
                // price: this.payType === 'case' ? casePrice : this.minObject.materialPrice,
                price: 0,
                //测试
                // price: this.payType === 'case' ? 0.01 : 0.01,
                userPhone: userAccount,
                userName: userNickname,
                scoreNum: Number(this.mixins_rules_integral),
                couponId: this.mixins_rules_coupon_object?.id,
                couponTypeCode: this.mixins_rules_coupon_object?.typeCode
            };

            try {
                console.log(4444444);
                // this.payInitLoading = true;
                let res = await this.$apis.project.casePayment(params);

                if (res.code === 2 && this.pageData.shareType === 2) {
                    this.$message.warning(res.message);
                    this.mixins_pc_money_dialog = false;
                    this.mixins_pc_money_pay_dialog = false;
                    this.mixins_rules_loading = false;
                    // 重置数据
                    await this.initCz();
                    await this.initVal();
                    return;
                }

                if (res.code === 1 && res.data.paymentStatus === 20) {
                    await this.handlePaySuccess();
                } else {
                    this.$message.warning(res.message);
                    this.mixins_rules_loading = false;
                    // 重置数据
                    await this.initCz();
                }
            } catch (e) {
                this.payInitLoading = false;
                this.mixins_rules_loading = false;
                console.log(e);
            }
        },
        // 支付成功，重新请求接口
        async handlePaySuccess() {
            if (this.pageData.shareType === 2) {
                this.$message.success('获取成功');
                this.mixins_rules_loading = false;
                this.mixins_pc_money_dialog = false;
                await this.getMaterialInfo(this.id, 0);
                return;
            }

            if (this.pageData.shareType === 1 && this.payType === 'material') {
                const id = this.materialItem.id;
                // 积分抵扣
                const res = await this.$apis.project.getMaterialInfo({ id, buy: 1 });
                if (res.code === 1) {
                    await this.getMaterialInfo(this.id, 0);
                    this.mixins_rules_loading = false;
                    this.mixins_pc_integral_dialog = false;
                    await this.$message.success('获取成功');
                }
            } else if (this.pageData.shareType === 1 && this.payType === 'case') {
                const id = this.pageData.id;
                // 积分抵扣
                const res = await this.$apis.project.buyCase({ id });

                if (res.code === 1) {
                    await this.getMaterialInfo(this.id, 0);
                    this.$message.success('获取成功');
                    // await this.handleMoneyMixinsClickCancel();
                    this.mixins_rules_loading = false;
                    this.mixins_pc_integral_dialog = false;
                } else {
                    this.$message.success(res.message);
                    this.mixins_rules_loading = false;
                }
            }

            // await this.getMaterialInfo(this.id, 0);
        },

        // 广告
        getAdvertisementList() {
            this.$apis.advert
                .getAdPosition({
                    bannerPositionId: 'materialdetail_small_A',
                    provinceId: this.city.id
                })
                .then(res => {
                    this.advertisementListA = res.data;
                });
            this.$apis.advert
                .getAdPosition({
                    bannerPositionId: 'materialdetail_small_B',
                    provinceId: this.city.id
                })
                .then(res => {
                    this.advertisementListB = res.data;
                });
        },

        // 初始化数据
        initPageData(buy = 0) {
            let pageData = this.pageData;
            if (!pageData?.id) return;

            // 获取该案例材料、用户积分
            Promise.all([this.getCaseInfo(pageData?.caseId ?? null), this.getUserScore()]);

            // 处理分享数据
            let config = Object.assign({}, this.shareConfig, {
                title: pageData.materialName,
                description: pageData.materialName,
                url: `${process.env.VUE_APP_H5_WEBSITE}/material?id=${pageData.id}`
            });
            this.shareConfig = config;
            this.showShare = true;
            try {
                this.pageData.materialFileInfo = JSON.parse(this.pageData.materialFileInfo);
            } catch (error) {
                this.pageData.materialFileInfo = {};
            }

            // 请求接口
            if (buy === 1) return;
            Promise.all([
                this.addBrowse(),
                this.getAboutMaterial(pageData),
                this.getCommonQuestion(pageData),
                this.getBrowseHistory(pageData),
                this.commonQuestion()
            ]);
        },

        // 获取材料信息
        async getMaterialInfo(id, buy = 0) {
            const res = await this.$apis.project.getMaterialInfo({ id, buy });
            this.isDelete = res.data.isDelete === 1;
            if (!this.isDelete) {
                this.pageData = res.data.source;
                // 单独处理图片
                this.fileJPGs = res.data.source.fileJPGs;
                this.initPageData(buy);
            }

            if (res.code === 1) {
                this.mixins_rules_loading = false;
                this.mixins_pc_integral_dialog = false;
            } else {
                this.mixins_pc_integral_dialog = false;
                this.mixins_rules_loading = false;
            }

            if (this.isLogin) {
                const user = await this.$store.dispatch('user/getUserInfo');
                this.mixins_rules_count = user?.data?.userScore.count;
                this.mixins_rules_variety_count = user?.data?.userScore.count;
            }
        },

        // 相似材料
        async getAboutMaterial(item) {
            const res = await this.$apis.project.getMaterialList({
                curPage: 1,
                pageRecord: 5,
                condition: {
                    materialTypeId: item.materialTypeId,
                    projectDefineId: item.projectDefineId
                }
            });
            if (!res.list) {
                res.list = [];
            }
            //排除当前
            res.list = res.list.filter(item => item.id !== this.id);
            this.aboutData = res.list;
        },

        // 获取该案例材料
        async getCaseInfo(id) {
            if (!id) return;
            const { data } = await this.$apis.project.getCaseInfo({ id });
            this.handleCaseList(data.materialList || []);
        },

        // 处理该案例材料列表
        handleCaseList(list) {
            if (list && list.length) {
                const { id } = this.pageData;
                const caseMaterialArr = this.flatten(list.map(item => item.list));
                const caseMaterialActive = caseMaterialArr.findIndex(item => item.id === id);
                this.caseMaterialArr = caseMaterialArr;
                this.caseMaterialActive = caseMaterialActive;
            }
        },

        // 数组扁平化，为了兼容一些老版浏览器
        flatten(arr) {
            return arr.reduce((res, next) => {
                return res.concat(Array.isArray(next) ? this.flatten(next) : next);
            }, []);
        },

        // 常见问题
        commonQuestion(item) {
            this.getCommonQuestion({
                projectDefineId: this.pageData.projectDefineId // 项目定义
            });
        },

        // 浏览记录
        async getBrowseHistory() {
            const res = await this.$apis.user.getBrowseHistory({
                pageRecord: 5,
                condition: {
                    id: this.$route.query.id,
                    targetTypeCode: 'MATERIAL'
                }
            });
            this.historyData = res.list;
        },

        //购买
        onBuy() {
            if (!this.isLogin) return this.loginDetect();

            this.initVal();

            this.materialItem = this.pageData;
            this.payType = 'material';

            if (this.pageData.shareType === 1) {
                const pay = this.pageData.isPayScore
                    ? this.pageData.materialScoreNumber
                    : this.pageData.caseScoreNumber;
                this.initMixinsRulesIntegral(pay);
                this.handleChangeIntegralMixins();
            } else if (this.pageData.shareType === 2) {
                //微信支付宝购买
                this.initMixinsRulesNuxt(this.pageData?.materialPrice || this.pageData?.casePrice);
            }
        },

        //弹框支付
        onShowPay(type = 'case') {
            this.handleMoneyMixinsClickCancel();
        },

        // 购买材料
        buyMaterial() {
            if (!this.isLogin) return this.loginDetect();

            this.initVal();
            const ScoreNumber = this.pageData.materialScoreNumber;
            this.$confirm(`确定要支付${ScoreNumber}积分观看吗?`, '提示', {
                customClass: 'zsy-message-box',
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showCancelButton: true,
                closeOnClickModal: false,
                type: 'warning',
                beforeClose: async (action, instance, done) => {
                    if (action === 'confirm') {
                        instance.confirmButtonLoading = true;
                        await this.getMaterialInfo(this.id, 1);
                        this.$message.success('支付成功');
                        done();
                        instance.confirmButtonLoading = false;
                    } else {
                        done();
                    }
                }
            }).catch(() => {});
        },

        // 支付成功，重新请求接口
        // handlePaySuccess() {
        //     this.getMaterialInfo(this.id, 1);
        // },

        // 面包屑--材料列表跳转
        setMaterialList() {
            const query = {
                materialTypeId: this.pageData.materialTypeId,
                educTypeId: this.pageData.educTypeId,
                projectDefine: Number(this.pageData.projectDefineId),
                projectDefineId: Number(this.pageData.projectDefineId),
                moduleClassify: 'MATERIAL'
            };
            this.toSearch(query);
        },

        // 相似材料跳转搜索页-参数设置
        setMaterial() {
            const query = {
                // major: this.pageData.materialTypeId,
                educTypeId: this.pageData.educTypeId,
                projectDefine: Number(this.pageData.projectDefineId),
                projectDefineId: Number(this.pageData.projectDefineId),
                moduleClassify: 'MATERIAL'
            };
            this.toSearch(query);
        },

        // 前往全部项目
        toAllProject() {
            this.$router.push({
                path: '/projectlist',
                query: {
                    major: this.pageData.materialTypeId,
                    educTypeId: this.pageData.educTypeId
                }
            });
        },

        // 认领项目
        toCaseClaim() {
            if (!this.isLogin) return this.loginDetect();

            this.$router.push({
                path: '/caseClaim',
                query: {
                    caseId: this.pageData.caseId,
                    caseName: this.pageData.caseName
                }
            });

            // if (this.teacherInfo.auditStatus === 2) {

            // } else {
            //     this.$router.push({
            //         path: '/teacher-claim'
            //     });
            // }
        },

        // 积分总数
        async getUserScore() {
            let res = await this.$apis.user.getUserScore();
            if (res.data) {
                this.userScore = res.data.count;
            }
        },

        // 上传案例
        async handleUploadCase() {
            if (!this.isLogin) {
                this.loginDetect();
            } else {
                return window.open(process.env.VUE_APP_API_COMMUNITY + '/CaseShareUpload', '_blank');
            }
        },

        goPage(path, query) {
            const { path: currentPath } = this.$route;
            const newTarget = this.$router.resolve({
                path: path,
                query
            });
            window.open(newTarget.href, '_blank');
        },

        // 处理案例材料列表的切换
        handleCaseMaterial(item, index) {
            const { caseMaterialActive } = this;
            if (caseMaterialActive !== index) {
                this.caseMaterialActive = index;
                this.$router.push(`material?id=${item.id}`);
            }
        },

        // 右侧积分模块 获取全文 如果没有登录 跳转到登入页面
        integralShowAll() {
            if (!this.isLogin) {
                this.loginDetect();
            } else {
                if (this.pageData.isBuy !== 1) {
                    // 未购买
                    // 积分不足
                    if (this.userScore < this.pageData.materialScoreNumber) {
                        this.$message.warning('积分不足');
                    } else {
                        this.buyMaterial();
                    }
                } else {
                    this.$message.warning('已购买');
                }
            }
        },

        //显示邀请弹框
        onShowInvitation() {
            if (this.isLogin) {
                this.isShowInvitation = !this.isShowInvitation;
            } else {
                this.loginDetect();
            }
        },

        // 复制成功
        onShowCopy() {
            this.isShowCopySuccess = true;
            setTimeout(() => {
                this.isShowCopySuccess = false;
            }, 1500);
        }
    },
    head() {
        if (this.pageData) {
            const { materialName, projectDefineName, year, province, caseHonorName, schoolName, materialTypeName } =
                this.pageData;
            const title = materialName;
            const keywords = `${projectDefineName},${year}${province},${caseHonorName},${materialTypeName}, ${schoolName}`;
            return {
                title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: title
                    },
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: keywords
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content: title
                    }
                ]
            };
        }
    }
};
</script>

<style lang="scss" scoped>
$color: #0173cd;
@import '@/styles/detail.scss';

.page {
    .cont {
        .contMain {
            margin-bottom: 60px;

            .contMain-left {
                float: left;
                width: 980px;
                min-height: 30.8rem;

                .article-title {
                    font-weight: bold;
                    font-size: 26px;
                    color: #333;
                    line-height: 32px;
                }

                .source {
                    padding: 22px 0 20px 42px;
                    height: 20px;
                    line-height: 20px;
                    border-bottom: 2px solid #eee;

                    .source-left {
                        float: left;
                        white-space: nowrap;

                        .more-majors {
                            display: inline-block;
                            height: 16px;
                            max-width: 250px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }

                        a {
                            font-size: 14px;
                            color: #999;
                            margin-right: 15px;
                        }
                    }

                    .source-right {
                        font-size: 14px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                        a {
                            display: flex;
                            align-items: center;
                        }

                        .eye {
                            font-size: 12px;
                            color: #999;

                            .ico {
                                display: inline-block;
                                vertical-align: middle;
                                margin-right: 4px;
                                width: 15px;
                                height: 11px;
                                background: url(~/assets/images/ico_eye.png);
                            }
                        }

                        .share-box {
                            margin-left: 67px;

                            .transmit {
                                color: #999;
                            }

                            .already_collect_box,
                            .collect {
                                span {
                                    color: #999;
                                }
                            }

                            .ico2 {
                                vertical-align: middle;
                                margin: 0 8px 0 0;
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                background: url(~/assets/images/start-collect.png) no-repeat center center;
                                margin-left: 10px;
                            }

                            display: flex;
                            justify-content: flex-start;
                            width: 206px;

                            .text {
                                color: #999;
                            }

                            // 转发
                            .share {
                                width: 70px;
                                display: inline-flex;
                                line-height: 30px;
                                height: 30px;
                                margin-left: 0px;
                                border: 1px solid #f5f5f5;
                            }
                            .collect {
                                width: 70px;
                                display: inline-flex;
                                line-height: 30px;
                                margin-left: 8px;
                                border: 1px solid #f5f5f5;
                            }

                            .collect2 {
                                width: 100px;
                                display: inline-flex;
                                line-height: 30px;
                                margin-left: 8px;
                                border: 1px solid #f5f5f5;
                            }

                            .transmit_img {
                                margin-top: 0;
                                margin-right: 8px;
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                background: url('~/assets/images/ico_share.png') no-repeat center/100% 100%;
                                margin-left: 10px;
                            }

                            // 收藏
                            .already_collect_img {
                                margin-top: 0;
                                margin-right: 8px;
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                background: url('~/assets/images/new_already_collect.png') no-repeat center/100% 100%;
                                margin-left: 10px;
                            }

                            .already_collect_box {
                                display: bolck;
                                white-space: nowrap;
                                height: 28px;
                                overflow: hidden;
                                width: 45px;

                                .already_collect {
                                    height: 15px;
                                }
                            }

                            a {
                                &:hover {
                                    span {
                                        color: $color;
                                    }

                                    .transmit {
                                        color: $color;
                                    }

                                    .already_collect_box {
                                        span {
                                            color: $color;
                                        }
                                    }

                                    color: $color;

                                    // 转发
                                    .transmit_img {
                                        width: 15px;
                                        height: 15px;
                                        background: url('~/assets/images/transmit-hover.png') no-repeat center/100% 100%;
                                    }

                                    // 收藏
                                    .ico2 {
                                        vertical-align: middle;
                                        margin: 0 8px 0 0;
                                        display: inline-block;
                                        width: 15px;
                                        height: 15px;
                                        background: url(~/assets/images/start-collect-active.png) no-repeat center
                                            center;
                                        margin-left: 10px;
                                    }

                                    // 已收藏
                                    .already_collect_img {
                                        width: 12px;
                                        height: 12px;
                                        margin-top: 1px;
                                        background: url('~/assets/images/new_cancel_collect.png') no-repeat center/100%
                                            100%;
                                    }

                                    .already_collect_box {
                                        width: 60px;

                                        span {
                                            margin-left: -43px;
                                        }
                                    }
                                }
                            }

                            /deep/ .make-money .icon-box::before {
                                top: -1px;
                            }
                        }

                        .share-box2 {
                            margin-left: 60px;
                            display: inline-block;
                            font-size: 14px;
                            line-height: 28px;

                            a {
                                display: inline-block;
                                vertical-align: middle;
                                margin: -4px 0 0 8px;
                                width: 30px;
                                height: 30px;
                                color: #888;
                            }

                            .btn {
                                width: auto;
                            }

                            .wechat {
                                background: url(~/assets/images/ico_wechat.png);
                            }

                            .sina {
                                background: url(~/assets/images/ico_sina.png);
                            }

                            .qq {
                                background: url(~/assets/images/ico_qq.png);
                            }

                            .zone {
                                background: url(~/assets/images/ico_zone.png);
                            }
                        }
                    }
                }

                .article-main {
                    position: relative;
                    width: 980px;
                    font-size: 16px;
                    color: #555;
                    line-height: 28px;
                    box-shadow: 0 2px 6px 2px #ebebeb;
                    margin-top: 22px;

                    .article {
                        p {
                            text-indent: 2em;
                        }
                    }

                    .all {
                        position: absolute;
                        top: 30px;
                        right: 30px;
                        width: 20px;
                        height: 19px;
                        background: url(~/assets/images/all.png) no-repeat;
                    }
                }

                .article-foot {
                    // width: 850px;
                    padding: 0 115px;
                    box-shadow: 0 2px 6px 2px #ebebeb;
                    border-radius: 5px;
                    margin-top: 10px;

                    .foot-text {
                        min-height: 88px;
                        line-height: 88px;
                        text-align: center;
                        border-bottom: 2px solid #eee;
                        color: #555;
                        font-size: 18px;

                        .text {
                            color: $color;
                        }

                        p {
                            display: flex;
                            justify-content: center;
                        }

                        .left {
                            width: 206px;
                            margin-top: 20px;

                            img {
                                width: 100%;
                                object-fit: cover;
                            }
                        }

                        .right {
                            width: 245px;
                            margin-top: 30px;
                            margin-left: 23px;

                            .tip {
                                font-size: 18px;
                                height: 19px;
                                line-height: 19px;
                                color: #555;
                            }

                            .explain {
                                margin-top: 19px;
                                height: 13px;
                                line-height: 13px;
                                font-size: 14px;
                                color: #999;
                            }

                            .button {
                                text-align: left;

                                button {
                                    width: 160px;
                                    height: 40px;
                                    background-color: #0173cd;
                                    border-radius: 4px;
                                    border: none;
                                    color: white;
                                    font-size: 14px;
                                    margin-top: 30px;
                                    cursor: pointer;
                                }

                                .obtain {
                                    cursor: pointer;
                                    color: #0173cd;
                                    font-size: 14px;
                                    margin-left: 20px;
                                }
                            }

                            .morepoints {
                                padding-left: 20px;
                                font-size: 14px;
                                color: #0173cd;

                                a {
                                    color: #0173cd;
                                    cursor: pointer;
                                }
                            }

                            .share {
                                margin-top: 44px;
                                display: flex;
                                align-items: center;

                                a {
                                    display: inline-block;
                                    vertical-align: middle;
                                    margin: -4px 0 0 8px;
                                    width: 30px;
                                    height: 30px;
                                    color: #888;
                                }

                                .wechat {
                                    background: url(~/assets/images/ico_wechat.png);
                                }

                                .sina {
                                    background: url(~/assets/images/ico_sina.png);
                                }

                                .qq {
                                    background: url(~/assets/images/ico_qq.png);
                                }

                                .zone {
                                    background: url(~/assets/images/ico_zone.png);
                                }
                            }
                        }
                    }

                    .foot-share {
                        height: 101px;

                        // 收藏
                        .collect {
                            margin-top: 20px;
                            display: inline-block;
                            // width: 98px;
                            padding: 0 18px;
                            height: 38px;
                            line-height: 38px;
                            text-align: center;
                            border: 1px solid $color;
                            border-radius: 3px;
                            color: $color;

                            .ico2 {
                                vertical-align: middle;
                                margin: -2px 8px 0 0;
                                display: inline-block;
                                width: 15px;
                                height: 15px;
                                background: url(~/assets/images/start-collect.png) no-repeat center center;
                            }

                            .ico {
                                display: inline-block;
                                vertical-align: middle;
                                margin: -2px 10px 0 0;
                                width: 19px;
                                height: 18px;
                                background: url(~/assets/images/ico_star_active.png) no-repeat center center;
                            }
                        }

                        .collect2 {
                            color: #666;
                            border-color: #f0f0f0;

                            .ico {
                                background: url(~/assets/images/ico_tick2.png) no-repeat center center;
                            }
                        }

                        // 转发
                        .share {
                            float: right;
                            font-size: 14px;
                            line-height: 28px;
                            margin-top: 20px;
                            color: #777;
                            display: flex;
                            align-items: center;

                            a {
                                display: inline-block;
                                vertical-align: middle;
                                margin: -4px 0 0 8px;
                                width: 30px;
                                height: 30px;
                            }

                            .wechat {
                                background: url(~/assets/images/ico_wechat.png);
                            }

                            .sina {
                                background: url(~/assets/images/ico_sina.png);
                            }

                            .qq {
                                background: url(~/assets/images/ico_qq.png);
                            }

                            .zone {
                                background: url(~/assets/images/ico_zone.png);
                            }
                        }
                    }
                }

                // 材料底部
                .material-foot {
                    .foot-text {
                        line-height: 0;
                        min-height: auto;
                    }

                    .buy-rest {
                        display: flex;
                        justify-content: center;
                        padding: 30px 0;
                    }

                    .notenough-score {
                        p {
                            display: block;
                            text-align: center;
                            color: #333;

                            span {
                                color: orangered;
                                margin: 0 5px;
                            }
                        }

                        p:first-child {
                            font-weight: bold;
                            cursor: pointer;
                        }

                        p:last-child {
                            margin-top: 20px;
                            font-size: 14px;
                        }
                    }

                    .left {
                        width: 206px;

                        img {
                            width: 100%;
                            object-fit: cover;
                        }
                    }

                    .right {
                        width: 300px !important;
                        text-align: left;

                        .tip {
                            font-size: 18px;
                            height: 19px;
                            color: #555;
                        }

                        .explain {
                            margin-top: 19px;
                            font-size: 14px;
                            color: #999;
                        }

                        .button button {
                            width: 121px;
                            height: 41px;
                            background-color: #0173cd;
                            border-radius: 4px;
                            border: none;
                            color: white;
                            font-size: 14px;
                            margin-top: 30px;
                            cursor: pointer;
                        }

                        .morepoints {
                            padding-left: 20px;
                            font-size: 14px;
                            color: #0173cd;

                            a {
                                color: #0173cd;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }

            .contMain-right {
                float: left;
                margin-left: 40px;
                width: 260px;
                .shelves {
                    width: 260px;
                    height: 58px;
                    background: #eeeeee;
                    border: 1px solid #d2d2d2;
                    opacity: 1;
                    border-radius: 4px;
                    line-height: 58px;
                    text-align: center;
                    font-size: 16px;
                    color: #ffffff;
                }

                .complete {
                    idth: 260px;
                    height: 58px;
                    background: #0173cc;
                    border: 1px solid #0173cc;
                    opacity: 1;
                    border-radius: 4px;
                    color: #ffffff;
                    text-align: center;
                    line-height: 58px;
                    cursor: pointer;
                }

                .btn-claim,
                .btn-home {
                    width: 258px;
                    height: 56px;
                    text-align: center;
                    line-height: 56px;
                    border: 1px solid $color;
                    border-radius: 5px;
                    font-size: 16px;

                    a {
                        display: block;
                    }
                }

                .btn-claim {
                    background: #eef7fe;

                    a {
                        color: $color;
                    }
                }

                // 已认领
                // .claimed{

                // }
                .btn-home {
                    margin-top: 15px;
                    background: #fff;

                    a {
                        color: #286eb3;
                    }
                }

                .btn-home-claim {
                    background: #eef7fe;

                    a {
                        height: 100%;
                        line-height: 16px;
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        justify-content: center;

                        i {
                            height: auto;
                            flex-grow: 0;

                            &:last-child {
                                margin-top: 7px;
                                font-size: 14px;
                                line-height: 14px;
                                color: #888;

                                span {
                                    color: #ff5722;
                                }
                            }
                        }
                    }
                }

                .item {
                    margin-top: 36px;

                    .aside-h4 {
                        margin-bottom: 20px;
                        font-size: 18px;

                        a {
                            color: #444;
                            font-weight: bold;
                        }

                        .more {
                            float: right;
                            margin-top: 8px;
                            width: 26px;
                            height: 6px;
                        }
                    }

                    .btn-ul {
                        li {
                            width: 260px;
                            line-height: 20px;
                            min-height: 28px;
                            padding: 15px 0;
                            text-align: center;
                            background: #ebf4fb;
                            border-radius: 5px;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            a {
                                padding: 0 10px;
                                display: block;
                                color: $color;
                            }

                            &:not(:last-child) {
                                margin-bottom: 10px;
                            }
                        }
                    }

                    .list {
                        li {
                            margin-top: 18px;

                            a {
                                display: block;
                                font-size: 16px;
                                color: #777;
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                height: 17px;

                                &:hover {
                                    color: $color;
                                }
                            }
                        }
                    }
                }

                .ad {
                    margin-top: 26px;
                    margin-bottom: -10px;

                    img {
                        border-radius: 4px;
                    }
                }

                .ad2 {
                    margin-top: 36px;

                    img {
                        border-radius: 4px;
                    }
                }

                .integral {
                    margin-top: 40px;

                    .msg {
                        font-size: 18px;
                        font-weight: bold;
                        color: #444;
                        letter-spacing: 1px;

                        i {
                            color: #ff5722;
                        }
                    }

                    .btn {
                        margin-top: 22px;
                        height: 40px;
                        line-height: 40px;
                        background-color: #ffffff;
                        border-radius: 4px;
                        border: solid 1px #0173cd;
                        text-align: center;

                        a {
                            font-size: 16px;
                            color: #0173cd;
                            letter-spacing: 1px;
                        }
                    }

                    .link-list {
                        a {
                            display: block;
                            font-size: 16px;
                            line-height: 16px;
                            margin-top: 22px;
                            color: #777;

                            &:hover {
                                color: #0173cd;
                            }
                        }
                    }
                }

                .case-material {
                    margin-top: 40px;

                    .hd {
                        display: flex;
                        justify-content: space-between;
                        align-content: center;
                        height: 18px;
                        cursor: pointer;
                    }

                    .tit {
                        font-size: 18px;
                        color: #444;
                        font-weight: bold;
                        letter-spacing: 1px;
                    }

                    .hd-more {
                        display: block;
                        height: 18px;
                        width: 26px;
                        box-sizing: border-box;

                        i {
                            display: inline-block;
                        }
                    }

                    .list {
                        a {
                            width: 260px;
                            position: relative;
                            display: block;
                            margin-top: 22px;
                            font-size: 16px;
                            line-height: 16px;
                            color: #333;
                            letter-spacing: 1px;
                            padding-left: 18px;
                            @include ellipsis(1);

                            .circle {
                                position: absolute;
                                top: 4px;
                                left: 0;
                                display: block;
                                height: 8px;
                                width: 8px;
                                border-radius: 4px;
                                background-color: #ccc;
                            }

                            &:hover {
                                color: #0173cd;

                                .circle {
                                    background: #0173cd;
                                }
                            }
                        }

                        .case-material-active {
                            color: #0173cd;
                            font-weight: 550;

                            .circle {
                                background: #0173cd;
                            }
                        }
                    }

                    .query-whole {
                        margin-top: 22px;
                        font-size: 16px;
                        color: #286eb3;
                        cursor: pointer;
                    }
                }
            }
        }
    }
}

.detail-material {
    &.full-screen {
        position: fixed;
    }

    .cont {
        .contMain {
            .contMain-left {
                .article-title {
                    text-align: center;
                    font-weight: bold;
                }
            }

            .contMain-right {
                .claimed {
                    margin-top: 20px;
                }
            }
        }

        //缺省页
        .default-page {
            width: 100%;
            height: 500px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            background: #fff;
            .default-page-img {
                width: 500px;
            }
            .default-page-text {
                font-size: 20px;
                color: #999;
                margin-top: 20px;
            }
        }
    }

    .article-main {
        box-shadow: none !important;
        position: relative;

        .article-pull-screen {
            position: absolute;
            cursor: pointer;
            right: 30px;
            top: 30px;
        }

        .article-content {
            .article-item {
                padding: 0 5%;
                text-align: center;
                border-radius: 4px;
                margin-bottom: 10px;
                box-shadow: 0px 1px 8px 0px rgba(28, 29, 29, 0.16);
                min-height: 500px;
                display: flex;
                align-items: center;
                justify-content: center;

                img {
                    width: 100% !important;
                    object-fit: cover;
                }

                img.default-img {
                    width: 350px !important;
                }
            }
        }

        .article-video {
            video {
                width: 100%;
                height: 610px;
            }
        }

        &.full-screen {
            position: fixed !important;
            margin: 0 !important;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100% !important;
            height: 100%;
            background: white;
            overflow-y: scroll;
        }
    }
}

.qr-code {
    .qr-code-main {
        margin-top: -16px;
        text-align: center;

        img {
            height: 280px;
            width: 280px;
        }

        p {
            margin-top: 16px;
            margin-bottom: 18px;
            font-size: 14px;
            color: #999;

            i {
                color: #ff5722;
            }
        }
    }
}
</style>

<style>
.qr-code > .el-dialog {
    border-radius: 6px;
}

.el-dialog__headerbtn {
    font-size: 26px;
}
</style>

<style lang="scss" scoped>
/deep/ .el-dialog {
    .el-dialog__header {
        padding: 0;
        border: 0;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #909399;
        font-size: 20px;
        font-weight: 900;
    }
}

.dialog-box {
    display: flex;
    flex-direction: column;

    .title {
        text-align: center;
        padding-bottom: 44px;
        font-size: 18px;
        color: #333333;

        span {
            color: #fd4d4d;
        }
    }

    .coupon-select {
        margin-left: 72px;
        padding-bottom: 22px;
        color: #333333;
    }

    .integral-input {
        margin-left: 72px;
        display: flex;
        padding-bottom: 42px;
        color: #333333;

        .integral-box {
            padding-top: 10px;
        }

        .title {
            padding-top: 12px;
        }

        .input-box {
            padding-left: 18px;
            display: flex;
            flex-direction: column;

            .msg-box {
                font-size: 14px;
                font-weight: 400;
                color: #999999;
                padding-top: 14px;

                span {
                    color: #fd4d4d;
                }
            }
        }
    }

    .point {
        padding-left: 118px;
        font-size: 14px;
        font-weight: 400;
        color: #fd4d4d;
    }
}

/deep/ .el-select {
    .is-disabled {
        i {
            cursor: not-allowed !important;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .el-select__caret {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

/deep/ .el-dialog__footer {
    padding: 20px 20px 20px;
    border-top: 1px solid #eee;
    .el-button {
        width: 100px;
        height: 34px;
        padding: 10px 20px;
    }

    .dialog-footer .el-button--primary {
        background-color: #0173cd !important;
        border-color: #0173cd;
        border: 0;
        span {
            color: #ffffff !important;
        }
    }

    .dialog-footer .el-button--primary:hover {
        background-color: #0883e4 !important;
        border-color: #0883e4;
    }

    .el-button--default:hover {
        background-color: #0883e4 !important;
        border-color: #0173cd;

        span {
            color: #fff !important;
        }
    }
}

/deep/ .el-loading-spinner {
    margin-top: -10px;

    .circular {
        height: 20px;
        width: 20px;
    }
}
</style>

<style lang="scss" scoped>
/deep/ .el-select {
    text-align: center;
    width: 246px;

    .el-input__inner {
        text-align: center;
    }
}

/deep/ .el-popper {
    margin-top: 4px !important;
}

/deep/ .el-popper .popper__arrow {
    display: none;
}

/deep/ .el-select-dropdown {
    text-align: center;
}

/deep/ .el-select-dropdown__item:hover {
    color: #0173cd;
}

/deep/ .el-select-dropdown :hover {
    color: #0173cd;
}

/deep/ .el-input-number__decrease,
/deep/ .el-input-number__increase {
    width: 30px;
    height: 32px;
    background: transparent;
    font-size: 14px;
    font-weight: 400;
    color: #999999;

    &:hover {
        color: #999999;
    }
}

/deep/ .el-input-number__decrease:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled),
/deep/ .el-input-number__increase:hover:not(.is-disabled) ~ .el-input .el-input__inner:not(.is-disabled) {
    border-color: #dcdfe6;
}

/deep/ .el-input__inner {
    height: 34px;
    line-height: 34px;
    padding: 0 43px;
}

/deep/ .el-input__inner:focus {
    border-color: #dcdfe6;
}

.exemption {
    display: flex;
    align-items: center;
    margin-top: 30px;
    cursor: pointer;

    img {
        width: 28px;
        height: 22px;
        display: block;
        margin-right: 12px;
    }

    a {
        font-size: 16px;
        color: #666;
    }
}
</style>
