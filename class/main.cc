#include <iostream>
#include "Root.h"
#include "Node.h"

int main() {
  Node * n_n = new Node();
  Root * r_n = new Root();

  n_n->foo();
  n_n->fee();
  n_n->fie();
  n_n->foe();
  n_n->fum();


  r_n->foo();
  r_n->fee();
  r_n->fie();
  r_n->foe();
  r_n->fum();

  return 0;
}
