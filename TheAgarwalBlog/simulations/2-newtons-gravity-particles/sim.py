


import numpy as np
from matplotlib import pyplot as plt
import matplotlib.animation as animation

max_x, max_y = 5, 5
num_x, num_y = 200, 200
max_time = 1000
dt = 0.05

space_x = np.linspace(-max_x, max_x, num_x+1)
space_y = np.linspace(-max_y, max_y, num_y+1)

grid_x, grid_y = np.meshgrid(space_x, space_y)

class MassiveBodyTracker:

    def __init__(self, num):
        self.num = num
        self.masses = [1] * num
        self.positions = [(0., 0.)] * num
        self.velocities = [(0., 0.)] * num

    # Grid Based Potential Calculation, only for display
    def calculate_potential(self):
        potential = np.zeros((num_x+1, num_y+1))
        for idx in range(0, self.num):
            mass = self.masses[idx]
            pos_x, pos_y = self.positions[idx]
            distance = np.sqrt( (grid_x - pos_x) ** 2 + (grid_y - pos_y) ** 2 )
            potential = potential + (- mass / distance)

        return potential

    def update_positions_of_all_bodies(self):

        new_positions = [(0., 0.)] * self.num
        new_velocities = [(0., 0.)] * self.num

        for idx_from in range(0, self.num):
            acc_x, acc_y = 0., 0.
            pos_x, pos_y = self.positions[idx_from]
            vel_x, vel_y = self.velocities[idx_from]

            for idx_to in range(0, self.num):
                if idx_from == idx_to:
                    continue
                diff_pos_x, diff_pos_y = self.positions[idx_to][0] - pos_x, self.positions[idx_to][1] - pos_y
                distance = np.sqrt( (diff_pos_x)**2 + (diff_pos_y)**2 )
                acc_mag = self.masses[idx_to] / (distance**2)
                acc_x, acc_y = acc_x + acc_mag * (diff_pos_x / distance), acc_y + acc_mag * (diff_pos_y / distance)

            new_velocities[idx_from] = (vel_x + acc_x * dt, vel_y + acc_y * dt)
            new_positions[idx_from] = (pos_x + new_velocities[idx_from][0] * dt, pos_y + new_velocities[idx_from][1] * dt)    
            
        self.positions = new_positions
        self.velocities = new_velocities

def animate(time):
    global plot, bodies

    plt.title("Frame = %i " % time)
    bodies.update_positions_of_all_bodies()
    plot.set_data(bodies.calculate_potential())

    return [plot]

# Declaring Massive Bodies
bodies = MassiveBodyTracker(3)

# Declare Position of Bodies
bodies.positions[0] = (-2., 0.)
bodies.positions[1] = (+2, 0.)
bodies.positions[2] = (0., 0.)
# Declare Velocities of Bodies
bodies.velocities[0] = (0., 1.5)
bodies.velocities[1] = (0., -1.5)
bodies.velocities[2] = (0., 0.)
# Declare Masses of Bodies
bodies.masses[0] = 1
bodies.masses[1] = 1
bodies.masses[2] = 10

# Scalar Field for Newtonian Gravitational Potential
potential = bodies.calculate_potential()

fig, ax = plt.subplots()

plot = ax.matshow(potential, interpolation='bilinear')

plt.axis('scaled')
plt.colorbar(plot)

anim = animation.FuncAnimation(fig, animate, frames=max_time, repeat=True)

# plt.show()

anim.save('animation.mp4', writer = animation.FFMpegWriter(fps=60))


