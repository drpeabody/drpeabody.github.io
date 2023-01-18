

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation

def apply_boundary_conditions(maxX, maxY):
    global T
    T[:, 0, :] = 100.0
    T[:, :, 0] = 100.0
    T[:, :, maxY] = 0.0

def iterate(time):
    global T, alpha

    for i in range(1, resolution_x-1):
        for j in range(1, resolution_y-1):
            T_txy = T[time][i][j]
            T_x_sum = T[time][i+1][j] + T[time][i-1][j]
            T_y_sum = T[time][i][j+1] + T[time][i][j-1]
            T[time+1][i][j] = T_txy + alpha * ( T_x_sum - 4*T_txy + T_y_sum )

    return T[time + 1]

def animate(i):
    global plot
    result = iterate(i)
    for c in plot.collections:
        c.remove()

    plt.title("Frame = %i " % i)
    plot = plt.contourf(result, 50)
    return plot

alpha = 0.2499
resolution_x, resolution_y = 50, 50
max_time = 1000

T = np.zeros((max_time + 1, resolution_x, resolution_y))

apply_boundary_conditions(resolution_x - 1, resolution_y - 1)

plt.style.use('classic')
fig = plt.figure()
plot = plt.contourf(T[0], 50)
plt.colorbar()

anim = animation.FuncAnimation(fig, animate, frames=max_time, repeat=True)

# plt.show()

anim.save('animation.mp4', writer = animation.FFMpegWriter(fps=60))

