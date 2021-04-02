import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { vibrate } from './utils'

export default class App extends React.Component {
  // perlu state time(waktu)
  // fungsi start, pause, reset
  // fungsi ganti time ke waktu work dan breaktime
  // kayaknya pake interval, jangan lupa pake clearInterval

  constructor() {
    super()
    this.state = {
      isWork: true,
      isPause: true,
      workTime: {
        remainMinute: 0,
        remainSecond: 0,
        workMinute: 0,
        workSecond: 0
      },
      breakTime: {
        remainMinute: 0,
        remainSecond: 0,
        breakMinute: 0,
        breakSecond: 0
      }
    }
  }

  showTime() {
    let finalString = ''

    if (this.state.isWork) {
      finalString = this.state.workTime.remainMinute + ':' + this.state.workTime.remainSecond
    } else {
      finalString = this.state.breakTime.remainMinute + ':' + this.state.breakTime.remainSecond
    }

    return finalString
  }

  changeWorkMinute(minutes) {
    let menit
    if (minutes === '') {
      menit = '0'
    } else {
      menit = minutes
    }

    this.setState({
      isWork: this.state.isWork,
      isPause: true,
      workTime: {
        remainMinute: parseInt(menit),
        remainSecond: this.state.workTime.remainSecond,
        workMinute: parseInt(menit),
        workSecond: this.state.workTime.workSecond
      },
      breakTime: this.state.breakTime
    })
  }

  changeWorkSecond(seconds) {
    let detik
    if (seconds === '') {
      detik = '0'
    } else {
      detik = seconds
    }

    this.setState({
      isWork: this.state.isWork,
      isPause: true,
      workTime: {
        remainMinute: this.state.workTime.remainMinute,
        remainSecond: parseInt(detik),
        workMinute: this.state.workTime.workMinute,
        workSecond: parseInt(detik)
      },
      breakTime: this.state.breakTime
    })
  }

  changeBreakMinute(minutes) {
    let menit
    if (minutes === '') {
      menit = '0'
    } else {
      menit = minutes
    }

    this.setState({
      isWork: this.state.isWork,
      isPause: true,
      workTime: this.state.workTime,
      breakTime: {
        remainMinute: parseInt(menit),
        remainSecond: this.state.breakTime.remainSecond,
        breakMinute: parseInt(menit),
        breakSecond: this.state.breakTime.breakSecond
      }
    })
  }

  changeBreakSecond(seconds) {
    let detik
    if (seconds === '') {
      detik = '0'
    } else {
      detik = seconds
    }

    this.setState({
      isWork: this.state.isWork,
      isPause: true,
      workTime: this.state.workTime,
      breakTime: {
        remainMinute: this.state.breakTime.remainMinute,
        remainSecond: parseInt(detik),
        breakMinute: this.state.breakTime.breakMinute,
        breakSecond: parseInt(detik)
      }
    })
  }

  countBack() {
    const isWork = this.state.isWork

    if (isWork) {
      const remainMinute = this.state.workTime.remainMinute
      const remainSecond = this.state.workTime.remainSecond

      if (remainSecond === 0) {
        if (remainMinute === 0) {
          // causes phone to vibrate
          vibrate()
          // ganti ke break time
          this.setState({
            isWork: !this.state.isWork,
            isPause: this.state.isPause,
            workTime: {
              remainMinute: this.state.workTime.workMinute,
              remainSecond: this.state.workTime.workSecond,
              workMinute: this.state.workTime.workMinute,
              workSecond: this.state.workTime.workSecond
            },
            breakTime: this.state.breakTime
          })
        } else {
          // kurangi 1 menit
          this.setState({
            isWork: this.state.isWork,
            isPause: this.state.isPause,
            workTime: {
              remainMinute: this.state.workTime.remainMinute - 1,
              remainSecond: 59,
              workMinute: this.state.workTime.workMinute,
              workSecond: this.state.workTime.workSecond
            },
            breakTime: this.state.breakTime
          })
        }
      } else {
        // kurangi satu detik
        this.setState({
          isWork: this.state.isWork,
          isPause: this.state.isPause,
          workTime: {
            remainMinute: this.state.workTime.remainMinute,
            remainSecond: this.state.workTime.remainSecond - 1,
            workMinute: this.state.workTime.workMinute,
            workSecond: this.state.workTime.workSecond
          },
          breakTime: this.state.breakTime
        })
      }
    } else {
      const remainMinute = this.state.breakTime.remainMinute
      const remainSecond = this.state.breakTime.remainSecond

      if (remainSecond === 0) {
        if (remainMinute === 0) {
          // causes phone to vibrate
          vibrate()
          // ganti ke work time
          this.setState({
            isWork: !this.state.isWork,
            isPause: this.state.isPause,
            workTime: this.state.workTime,
            breakTime: {
              remainMinute: this.state.breakTime.breakMinute,
              remainSecond: this.state.breakTime.breakSecond,
              breakMinute: this.state.breakTime.breakMinute,
              breakSecond: this.state.breakTime.breakSecond
            }
          })
        } else {
          // kurangi 1 menit
          this.setState({
            isWork: this.state.isWork,
            isPause: this.state.isPause,
            workTime: this.state.workTime,
            breakTime: {
              remainMinute: this.state.breakTime.remainMinute - 1,
              remainSecond: 59,
              breakMinute: this.state.breakTime.breakMinute,
              breakSecond: this.state.breakTime.breakSecond
            }
          })
        }
      } else {
        // kurangi satu detik
        this.setState({
          isWork: this.state.isWork,
          isPause: this.state.isPause,
          workTime: this.state.workTime,
          breakTime: {
            remainMinute: this.state.breakTime.remainMinute,
            remainSecond: this.state.breakTime.remainSecond - 1,
            breakMinute: this.state.breakTime.breakMinute,
            breakSecond: this.state.breakTime.breakSecond
          }
        })
      }
    }
  }

  toogleIsPause() {
    this.setState({
      isWork: this.state.isWork,
      isPause: !this.state.isPause,
      workTime: this.state.workTime,
      breakTime: this.state.breakTime
    })
  }

  reset() {
    if (this.state.isWork) {
      this.setState({
        isWork: this.state.isWork,
        isPause: this.state.isPause,
        workTime: {
          remainMinute: this.state.workTime.workMinute,
          remainSecond: this.state.workTime.workSecond,
          workMinute: this.state.workTime.workMinute,
          workSecond: this.state.workTime.workSecond
        },
        breakTime: this.state.breakTime
      })
    } else {
      this.setState({
        isWork: this.state.isWork,
        isPause: this.state.isPause,
        workTime: this.state.workTime,
        breakTime: {
          remainMinute: this.state.breakTime.breakMinute,
          remainSecond: this.state.breakTime.breakSecond,
          breakMinute: this.state.breakTime.breakMinute,
          breakSecond: this.state.breakTime.breakSecond
        }
      })
    }
  }

  // lifecycle
  componentDidMount() {
    setInterval(() => {
      if (!this.state.isPause) {
        this.countBack()
      }
    }, 1000)
  }

  render() {
    if (this.state.isPause) {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 40 }} >{this.showTime()}</Text>
          <View style={[styles.row, styles.viewButton]} >
            <Button title="Start" onPress={() => this.toogleIsPause()} />
            <Button title="Reset" onPress={() => this.reset()} />
          </View>
          <View style={[styles.row, styles.viewInputTime]}>
            <Text style={{ fontWeight: 'bold' }} >Work time</Text>
            <Text>Mins:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(minutes) => this.changeWorkMinute(minutes)} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(seconds) => this.changeWorkSecond(seconds)} />
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: 'bold' }} >Break time</Text>
            <Text>Mins:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(minutes) => this.changeBreakMinute(minutes)} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(seconds) => this.changeBreakSecond(seconds)} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={{ fontSize: 40 }} >{this.showTime()}</Text>
          <View style={[styles.row, styles.viewButton]} >
            <Button title="Pause" onPress={() => this.toogleIsPause()} />
            <Button title="Reset" onPress={() => this.reset()} />
          </View>
          <View style={[styles.row, styles.viewInputTime]}>
            <Text style={{ fontWeight: 'bold' }} >Work time</Text>
            <Text>Mins:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(minutes) => this.changeWorkMinute(minutes)} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(seconds) => this.changeWorkSecond(seconds)} />
          </View>
          <View style={styles.row}>
            <Text style={{ fontWeight: 'bold' }} >Break time</Text>
            <Text>Mins:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(minutes) => this.changeBreakMinute(minutes)} />
            <Text>Secs:</Text>
            <TextInput style={styles.input} keyboardType='numeric' onChangeText={(seconds) => this.changeBreakSecond(seconds)} />
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 40,
    borderWidth: 1
  },
  row: {
    flexDirection: 'row'
  },
  viewButton: {
    marginVertical: 10,
  },
  viewInputTime: {
    justifyContent: 'space-between'
  }
});
