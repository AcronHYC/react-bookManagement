import React, { Component } from "react";
import { connect } from "dva";
import CustomBreadcrumb from "../../components/CustomBreadcrumb/index";
import { Row, Col } from "antd";
import echarts from "echarts/dist/echarts.common";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";

class Home extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.dispatch({
      type: "home/queryBookClassCount",
      payload: {},
      callback: (bookClass, bookClassCount) => {
        if (bookClass && bookClassCount) {
          let chart = echarts.init(document.getElementById("bar"));
          chart.setOption({
            title: {
              text: "图书类型及数量",
              x: "center",
              textStyle: {
                color: "#666666"
              }
            },
            tooltip: {},
            xAxis: {
              data: bookClass
            },
            yAxis: {},
            series: [
              {
                name: "数量",
                type: "bar",
                itemStyle: {
                  normal: {
                    color: "#6B6B6B"
                  }
                },
                data: bookClassCount
              }
            ]
          });
        }
      }
    });

    this.dispatch({
      type: "home/queryBookClassOutCount",
      payload: {},
      callback: (bookClass2, num) => {
        let chart = echarts.init(document.getElementById("line"));
        chart.setOption({
          title: {
            text: "类型图书的借出数量",
            x: "center",
            textStyle: {
              color: "#666666"
            }
          },
          xAxis: [
            {
              type: "category",
              name: "x",
              splitLine: { show: false },
              data: bookClass2
            }
          ],
          yAxis: [
            {
              type: "log",
              name: "y",
              min: function(value) {
                return value.min - 20;
              }
            }
          ],
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}"
          },
          calculable: true,
          series: [
            {
              name: "数量",
              type: "line",
              data: num,
              itemStyle: {
                normal: {
                  color: "#1874CD"
                }
              }
            }
          ]
        });
      }
    });

    this.dispatch({
      type: "home/queryUserBorrowCount",
      payload: {},
      callback: (realName, res) => {
        let chart = echarts.init(document.getElementById("pie"));
        chart.setOption({
          title: {
            text: "读者借书数量",
            x: "190px",
            y: "20px",
            textStyle: {
              color: "#666666"
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}本 ({d}%)"
          },
          legend: {
            orient: "vertical",
            x: "left",
            y: "90px",
            data: realName
          },
          calculable: true,
          series: [
            {
              name: "读者借书数量",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: res
            }
          ]
        });
      }
    });
  }

  render() {
    const { dispatch, loading, history } = this.props;

    return (
      <div>
        <CustomBreadcrumb arr={["仪表盘"]} />
        <Row gutter={24}>
          <Col span={12}>
            <div id="bar" style={{ width: "520px", height: "330px" }} />
          </Col>
          <Col span={12}>
            <div id="line" style={{ width: "520px", height: "330px" }} />
          </Col>
        </Row>
        <Row gutter={23}>
          <Col span={6} />
          <Col span={12}>
            <div id="pie" style={{ width: "580px", height: "350px" }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({ home, loading }) => ({ home, loading }))(Home);
