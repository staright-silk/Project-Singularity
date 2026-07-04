
# Hawking-enabled quantum black hole simulation
# implemented using regge  wheeler formalism, schrodinger eqn and tortoise coordinates
# for simplicity and illustrative rendering, some constants have been declared unity
import numpy as np
import matplotlib.pyplot as plt

rs=2.0 #schwarzchild radius
L=100.0
N=4096
r_start=rs+0.05
r=np.linspace(r_start,r_start+L,N,endpoint=False)
dr=r[1]-r[0]
k=2*np.pi*np.fft.fftfreq(N,d=dr)

dt=0.005
total_steps=4000
plot_interval=20

eps=0.01
V=-1.0/(r-rs+eps)

W=np.zeros_like(r)
awl=5.0
m=r<(rs+awl)
x=(rs+awl-r[m])/awl
W[m]=60*x**2
awr=15.0
m=r>(r_start+L-awr)
x=(r[m]-(r_start+L-awr))/awr
W[m]=60*x**2

r0=30
sigma=2
p0=-2.5
psi=np.exp(-(r-r0)**2/(4*sigma**2))*np.exp(1j*p0*r)
psi/=np.sqrt(np.sum(np.abs(psi)**2)*dr)

Veff=V-1j*W
UV=np.exp(-1j*Veff*dt/2)
UK=np.exp(-1j*0.5*k**2*dt)

hawking_temperature=0.15
radiation_width=3
hawking_mask=(r>=rs)&(r<=rs+radiation_width)

plt.ion()
fig,(ax1,ax2,ax3)=plt.subplots(3,1,figsize=(10,10),gridspec_kw={"height_ratios":[3,1,1]})
density_line,=ax1.plot(r,np.abs(psi)**2,label="|psi|^2")
hawking_line,=ax1.plot(r,np.zeros_like(r),'r',label="Hawking radiation")
ax1.plot(r,0.05*V,'k--',alpha=0.5)
ax1.axvline(rs,color='k',ls=':')
ax1.set_xlim(0,60); ax1.set_ylim(-0.3,0.4); ax1.legend()

prob_line,=ax2.plot([],[],'g')
ax2.set_xlim(0,total_steps*dt); ax2.set_ylim(0,1.05)
ax2.set_ylabel("Probability")

flux_line,=ax3.plot([],[],'r')
ax3.set_xlim(0,total_steps*dt)
ax3.set_ylabel("Hawking Flux")
ax3.set_xlabel("Time")

times=[]; probs=[]; flux=[]

for step in range(total_steps):
    psi*=UV
    noise=np.zeros_like(psi,dtype=complex)
    phase=np.exp(2j*np.pi*np.random.rand(np.sum(hawking_mask)))
    hw=np.sqrt(hawking_temperature)*phase*np.exp(-((r[hawking_mask]-(rs+0.8))**2)/(2*radiation_width**2))
    noise[hawking_mask]=hw
    psi+=0.002*noise
    psik=np.fft.fft(psi)
    psik*=UK
    psi=np.fft.ifft(psik)
    psi*=UV

    P=np.sum(np.abs(psi)**2)*dr
    H=np.sum(np.abs(noise)**2)*dr
    times.append(step*dt); probs.append(P); flux.append(H)

    if step%plot_interval==0:
        density_line.set_ydata(np.abs(psi)**2)
        disp=np.zeros_like(r)
        disp[hawking_mask]=100*np.abs(noise[hawking_mask])**2
        hawking_line.set_ydata(disp)
        prob_line.set_data(times,probs)
        flux_line.set_data(times,flux)
        if flux:
            ax3.set_ylim(0,max(flux)*1.2+1e-12)
        fig.canvas.draw_idle()
        plt.pause(0.001)

plt.ioff()
plt.show()
print("Final probability:",P)
print("Captured probability:",1-P)
