from math import floor, sqrt
from random import random

import pygame

SIZE = 800
MIN_RADIUS = 3
MAX_RADIUS = SIZE // 3
TOTAL_CIRCLES = floor(SIZE * 1.1)
CREATE_CIRCLE_ATTEMPTS = 500
LINE_WIDTH = 2

NON_INTERACTIVE_UPDATE_EVENT = pygame.event.Event(pygame.USEREVENT, attr1='NON_INTERACTIVE_UPDATE_EVENT')

pygame.init()
screen = pygame.display.set_mode((SIZE, SIZE))
clock = pygame.time.Clock()
done = False

class Circle:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

circles = []

def does_circle_have_a_collision(circle):
    for i in range(0, len(circles)):
        other_circle = circles[i]
        a = circle.radius + other_circle.radius
        x = circle.x - other_circle.x
        y = circle.y - other_circle.y

        if a >= sqrt((x * x) + (y * y)):
            return True

        if circle.x + circle.radius >= SIZE or circle.x - circle.radius <= 0:
            return True

        if circle.y + circle.radius >= SIZE or circle.y - circle.radius <= 0:
            return True

    return False

def create_circle():

    new_circle = None

    for _ in range(0, CREATE_CIRCLE_ATTEMPTS):

        new_circle = Circle(floor(random() * SIZE), floor(random() * SIZE), MIN_RADIUS)

        if does_circle_have_a_collision(new_circle):
            continue
        else:
            break

    for radius_size in range(MIN_RADIUS, MAX_RADIUS):
        new_circle.radius = radius_size

        if does_circle_have_a_collision(new_circle):
            new_circle.radius -= 1
            break

    circles.append(new_circle)

def draw_circles():
    for circle in circles:
        pygame.draw.circle(screen, (0, 0, 0, 0), (circle.x, circle.y), circle.radius, LINE_WIDTH)


pygame.event.post(NON_INTERACTIVE_UPDATE_EVENT)
screen.fill((255, 255, 255))

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True

        if event == NON_INTERACTIVE_UPDATE_EVENT:
            if len(circles) < TOTAL_CIRCLES:
                create_circle()
                draw_circles()
            pygame.display.flip()
            clock.tick(480)
            pygame.event.post(NON_INTERACTIVE_UPDATE_EVENT)
   
