const timing = [100, 300, 500, 1000, 3000]

timing.slow = timing[3]
timing.medium = timing[2]
timing.quick = timing[1]
timing.ease = 'ease-in-out'
timing.touchDecay = timing.medium

export default timing
