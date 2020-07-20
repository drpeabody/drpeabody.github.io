
import numpy as np
import matplotlib.pyplot as plt
import mpl_toolkits.mplot3d.axes3d as p3
import matplotlib.animation as animation

x = np.linspace(-5, 5, 30)
y = np.linspace(-5, 5, 30)
def gen_data(i):
	global x, y

	X, Y = np.meshgrid(x, y)
	Z = np.sin(X + Y + (i*3.1415)/100)
	return { 'X': X, 'Y': Y, 'Z': Z }

def draw(iteration, ax):
	ax.clear()

	ax.set_xlim3d([-5, 5])
	ax.set_ylim3d([-5, 5])
	ax.set_zlim3d([-4, 4])
	ax.plot_surface(**gen_data(iteration), rstride=1, cstride=1, cmap='viridis', edgecolor='none')

def main():
	iterations, save = 200, True
	fig = plt.figure()
	ax = p3.Axes3D(fig)

	draw(0, ax)

	ani = animation.FuncAnimation(fig, draw, iterations, fargs=[ax],
		interval=50, blit=False, repeat=False)

	if save:
		Writer = animation.writers['ffmpeg']
		writer = Writer(fps=30, metadata=dict(artist='Me'), bitrate=1800, extra_args=['-vcodec', 'libx264'])
		ani.save('rendering.mp4', writer=writer)
	plt.show()

main()
