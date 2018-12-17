use taobao;

/*==============================================================*/
/* DBMS name:      MySQL 5.7                                    */
/* Created on:     2018/6/9 18:21:17                            */
/*==============================================================*/

drop table if exists purchase;

drop table if exists product;

drop table if exists seller;

drop table if exists buyer;

drop table if exists goods;

drop table if exists trolley;


/*==============================================================*/
/* Table: product 货品                                             */
/*==============================================================*/
create table product
(
   p_id                 varchar(50) not null comment '货品ID',
   name               varchar(100) not null comment '货品名',
   price              decimal(10,2) not null comment '价格',
   category           varchar(50) not null comment '分类',
   onStock			  tinyint(1) not null comment '是否在售',
   img                varchar(50) not null comment '图片',
   primary key (p_id)
);

/*==============================================================*/
/* Table: goods       商品                                       */
/*==============================================================*/
create table goods
(
   p_id                 varchar(50) not null comment '货品ID',
   name               varchar(100) not null comment '商品名',
   price              decimal(10,2) not null comment '价格',
   s_id               varchar(50) not null comment '卖家ID',
   img                varchar(50) not null comment '图片',
   primary key (p_id, s_id)
);

/*==============================================================*/
/* Table: seller          卖家                                      */
/*==============================================================*/
create table seller
(
   name               varchar(30) not null comment '卖家用户名',
   password           varchar(20) not null comment '卖家登录密码',
   balance            double(10,2) not null comment '卖家余额',
   address            varchar(100) not null comment '发货地址',
   phone              varchar(11)  not null comment '卖家电话',
   primary key (name)
);


/*==============================================================*/
/* Table: buyer          买家                                     */
/*==============================================================*/
create table buyer
(
   name               varchar(30) not null comment '买家用户名',
   password           varchar(20) not null comment '买家登录密码',
   balance            double(10,2) not null comment '买家余额',
   address            varchar(100) not null comment '收货地址',
   phone              varchar(11)  not null comment '买家电话',
   primary key (name)
);

/*==============================================================*/
/* Table: trolley          购物车                                     */
/*==============================================================*/
create table trolley
(
   p_id                 varchar(50) not null comment '货品ID',
   s_id               varchar(50) not null comment '卖家ID',
   b_id               varchar(50) not null comment '买家ID',
   primary key (p_id, s_id, b_id)
);

/*==============================================================*/
/* Table: purchase          订单                                     */
/*==============================================================*/
create table purchase
(
   id				          varchar(50) not null comment '订单ID',
   p_id               varchar(50) not null comment '货品ID',
   s_id               varchar(50) not null comment '卖家ID',
   b_id               varchar(50) not null comment '买家ID',
   name               varchar(50) not null comment '购买时商品名称',
   price              varchar(50) not null comment '购买时商品价格',
   img                varchar(50) not null comment '图片',
   primary key (id, p_id, s_id, b_id)
);
