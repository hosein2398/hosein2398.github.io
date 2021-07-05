
import { useEffect, useRef, useState, useCallback } from 'react'
//  timer: them time animation runs evey second

/*
https://medium.com/burst/understanding-animation-with-duration-and-easing-using-requestanimationframe-7e3fd1688d6c
https://stackoverflow.com/questions/37268250/adding-easing-on-requestanimationframe/46604409

*/

const Textra = (props) => {
  const animationStyles = {
    rightToLeft: [{
      translate: {
        type: 'translateX',
        value: 0,
        unit: 'px'
      },
      opacity: 1
    }, {
      translate: {
        type: 'translateX',
        value: 10,
        unit: 'px'
      },
      opacity: 0
    }],
    flash: [{
      translate: {
        type: 'skewX',
        value: 0,
        unit: 'deg'
      },
      opacity: 1
    }, {
      translate: {
        type: 'skewX',
        value: -100,
        unit: 'deg'
      },
      opacity: 1
    }],
    flip: [{
      translate: {
        type: 'rotateX',
        value: 0,
        unit: 'deg'
      },
      opacity: 1
    }, {
      translate: {
        type: 'rotateX',
        value: -180,
        unit: 'deg'
      },
      opacity: 1
    }],
    scale: [{
      translate: {
        type: 'scale',
        value: 1,
        unit: ''
      },
      opacity: 1
    }, {
      translate: {
        type: 'scale',
        value: 0.9,
        unit: ''
      },
      opacity: 1
    }],
    press: [{
      translate: {
        type: 'scaleX',
        value: 1,
        unit: ''
      },
      opacity: 1
    }, {
      translate: {
        type: 'scaleX',
        value: 1.3,
        unit: ''
      },
      opacity: 1
    }]
  }

  const data = ['first', 'second', 'babababaab', ' bye bye']
  // which animation user has selected via props
  const selectedAnimation = props.effect
  const animationRef = useRef(null)
  const [style, setStyle] = useState(animationStyles[selectedAnimation][0])
  const [text, setText] = useState(data[0])
  const previousTime = useRef(null)
  const duration = 1000
  // TODO: call this stopThresholdSeconds
  const stopShowingSeconds = 3000
  const timeRoundPassed = useRef(duration)

  useEffect(() => {
    setStyle(animationStyles[selectedAnimation][0])
  }, [selectedAnimation])

  const easeOutQuad = t => t * (2 - t)

  const indexOfArray = useRef(1)
  const isAnimationShowing = useRef(true)
  const runAnimation = useCallback((timestamps) => {
    if (previousTime.current === null) previousTime.current = timestamps
    const elapsed = timestamps - previousTime.current / 1000

    if (elapsed > timeRoundPassed.current) {
      if (!isAnimationShowing.current) {
        // showing
        const showingTranlateInitial = animationStyles[selectedAnimation][1].translate.value
        const showingTranlateDiffrence = animationStyles[selectedAnimation][1].translate.value - animationStyles[selectedAnimation][0].translate.value
        const showingOpacityInitial = animationStyles[selectedAnimation][1].opacity
        // const showingOpacityDiffrence = animationStyles[selectedAnimation][1].opacity - (animationStyles[selectedAnimation][1].opacity - animationStyles[selectedAnimation][0].opacity)
        const showingTiming = easeOutQuad((elapsed - timeRoundPassed.current) / duration)
        setStyle(s => ({
          translate: {
            ...s.translate,
            value: showingTranlateInitial - showingTranlateDiffrence * showingTiming
          },
          opacity: 0 - (0 - 1) * showingTiming
        }))
      } else {
        // stop showing for a stopShowingSeconds
        if (elapsed > timeRoundPassed.current + stopShowingSeconds) {
          // hiding
          const hidingTraslateInitial = animationStyles[selectedAnimation][0].translate.value
          const hidingTranslateDiffrence = animationStyles[selectedAnimation][0].translate.value - animationStyles[selectedAnimation][1].translate.value
          const hidingOpacityInitial = animationStyles[selectedAnimation][0].opacity
          // const hidingOpacityDiffrence = animationStyles[selectedAnimation][1].opacity - (animationStyles[selectedAnimation][0].opacity - animationStyles[selectedAnimation][1].opacity)
          const hidingTiming = easeOutQuad((elapsed - (timeRoundPassed.current + stopShowingSeconds)) / duration)

          // const formula = 1 - (1 - 0) * easeOutQuad((elapsed - (timeRoundPassed.current + stopShowingSeconds)) / duration)

          // console.log('hiding :', formula)
          setStyle(s => ({
            translate: {
              ...s.translate,
              value: (hidingTraslateInitial - hidingTranslateDiffrence * hidingTiming)
            },
            opacity: hidingOpacityInitial - hidingTiming
          }))
        }
      }
    }

    if (isAnimationShowing.current) {
      if (elapsed > timeRoundPassed.current + duration + stopShowingSeconds) {
        timeRoundPassed.current += duration + stopShowingSeconds
        isAnimationShowing.current = !isAnimationShowing.current
        // setText(s => s === 'Helloooo' ? 'Bye bye' : 'Helloooo')
        setText(data[indexOfArray.current])
      }
    } else {
      if (elapsed > timeRoundPassed.current + duration) {
        if (indexOfArray.current + 1 === data.length) {
          indexOfArray.current = 0
        } else {
          indexOfArray.current += 1
        }
        timeRoundPassed.current += duration
        isAnimationShowing.current = !isAnimationShowing.current
      }
    }

    animationRef.current = window.requestAnimationFrame(runAnimation)
  }, [props.effect])

  useEffect(() => {
    animationRef.current = window.requestAnimationFrame(runAnimation)

    return () => {
      console.log('outt')
      window.cancelAnimationFrame(animationRef.current)
    }
  }, [runAnimation, props.effect])

  return (
        <div style={{ overflow: 'hidden' }}>
            <div style={{
              // position: 'relative',
              transform: `${style.translate.type}(${style.translate.value}${style.translate.unit})`,
              opacity: style.opacity
            }}>
                {text}
            </div>
        </div>
  )
}

export default Textra
